import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import BusList from "./BusList";
import  datapoints   from "../../dataValues/datapoints";
//import axios from 'axios';

const Buses = () => {
  const [busList, setTweets] = React.useState([]);
  const [loading, setLoading] = React.useState(true);   
  
  useEffect(() => {
    const fetchData = async () => {
	  const res = await fetch("http://"+process.env.pythonip+":5000/getData");
      const results  = await res.json();
      console.log(results);
      setTweets(results);
	  setLoading(false);
    };
 
    fetchData();
  }, []);

  return (
    <ScrollView noSpacer={true} noScroll={true} style={styles.container}>
	  {loading ? (
	    <ActivityIndicator
		  style={[styles.centering]}
		  color="#ff8179"
		  size="large"
	    />
	  ) : (
	    <BusList data={busList} />
	  )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "whitesmoke",
    marginTop: '60px'
  },
  centering: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    height: "100vh"
  }
});

export default Buses;
