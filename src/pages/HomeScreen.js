import React, { useEffect, useState } from 'react';
import Panel from '../components/Panel';
import MoneyForm from '../components/MoneyForm';
import MoneyList from '../components/MoneyList';
import { doc, collection, query, onSnapshot, where, orderBy } from "firebase/firestore"; 
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';


export default function HomeScreen() {
  const { currentUser } = useAuth();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (currentUser) {
        try {
          const q = query(
            collection(db, "records"), 
            where('userId', "==", doc(db, "users", currentUser.uid)), 
            orderBy("date", "desc"),
          );
          return onSnapshot(q, (querySnapshot) => {
            const temp = [];
            querySnapshot.forEach((doc) => {
                // temp.push(doc.data().name);
                temp.push(doc.data());
            });
            setRecords(temp);
            setLoading(false);
          });

          // const querySnapshot = await getDocs(collection(db, "records"));
          // let temp = []
          // querySnapshot.forEach((doc) => {
          //   // doc.data() is never undefined for query doc snapshots
          //   // console.log(doc.id, " => ", doc.data());
          //   temp.push(doc.data());
          // });
          // setRecords(temp);
          // setLoading(false);
        } catch (e) {
          console.log(e);
        }
      }
    }

    fetchData();
  } ,[currentUser]);

  return (
    <div>
      <Panel records={records}/> 
      <hr />
      <MoneyForm />
      <hr />
      <MoneyList loading={loading} records={records}/>
    </div>
  )
}
