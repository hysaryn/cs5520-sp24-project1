import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAllDocs, writeToDB } from '../firebase-files/firebaseHelper';

export default function GoalUsers({id}) {
    const [users, setUsers] = useState([]);
    

    useEffect(() => {
        async function fetchUsers() {
            try {
                const usersFromDB = await getAllDocs(`goals/${id}/users`);
                console.log("usersFromDB:   " + usersFromDB.length);
                if (usersFromDB.length) {
                    console.log("if block    "  + usersFromDB.length);
                    setUsers(usersFromDB);
                    return;
                }
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                if (!response.ok) {
                    throw new Error('data not found');
                }
                const data = await response.json();
                console.log(data);
                // store the data in an array and set it to state
                setUsers(data);
                //write a for loop and write the data into user subcollection
                data.forEach(element => {
                    writeToDB(element, "goals", id, "users");
                });
            } catch (error) {
                console.log("fetch user", error);
            }
        }  fetchUsers();
    }, []);
    
    return (
        <FlatList
        data={users}
        renderItem={({ item }) => (
            <Text>{item.name}</Text>
        )}
        />
    )
}

const styles = StyleSheet.create({})