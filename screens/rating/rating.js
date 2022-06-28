import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import TextField from "../../components/atoms/TextField";
  import { useSelector } from "react-redux";
  const backIcon = require("../../assets/icons/backIcon.png");
  
  export default function Rating({ route, navigation }) {
    const [rating, setRating] = useState(2);
    const [starCount, setStarCount] = useState(5.4);
    const [comment, setComment] = useState("");
    const { user } = useSelector((state) => state.auth);
  
    // const { shipment_id, rider_id } = route.params;
  
    const star =
      "https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png";
    const star_border =
      "https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png";
  
    const updateRating = (rating) => {
      setRating(rating);
    };
    useEffect(() => {
      // const submitReview = async () => {
      //   const token = user.token;
      //   var myHeaders = new Headers();
      //   myHeaders.append("Accept", "application/json");
      //   myHeaders.append("Authorization", `Bearer ${token}`);
      //   var requestOptions = {
      //     method: "GET",
      //     headers: myHeaders,
      //     redirect: "follow",
      //   };
  
      //   setLoading(true);
      //   try {
      //     const response = await fetch(
      //       `${API_SERVER}/admin/package/type`,
      //       requestOptions
      //     );
      //     const json = await response.json();
      //     console.log(json);
  
      //     setLoading(false);
      //   } catch (error) {
      //     setError(error);
      //     setLoading(false);
      //   }
      // };
    }, []);
    const renderStars = () => {
      const stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push(
          <TouchableOpacity
            activeOpacity={0.7}
            key={i}
            onPress={() => updateRating(i + 1)}
          >
            <Image
              style={styles.StarImage}
              source={i < rating ? { uri: star } : { uri: star_border }}
            />
          </TouchableOpacity>
        );
      }
      return stars;
    };
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.navigatorContainer}>
          <View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={backIcon} style={styles.backButton} />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={{ opacity: 0 }}>Rating</Text>
          </View>
          <View>
            <Text style={{ opacity: 0 }}>Rating</Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.main}>
          <View style={styles.successTextContainer}>
            <Text style={styles.successText}>How was your order?</Text>
            <Text style={styles.successDetailsText}>
              Rate Yun Ming and leave some details regarding the order.
            </Text>
            <View style={styles.childView}>{renderStars()}</View>
          </View>
          <View style={styles.successTextContainer}>
            <TextInput
              multiline
              numberOfLines={140}
              editable
              maxLength={140}
              placeholder="Additional Comments"
              style={{
                padding: 30,
                backgroundColor: "#d5f7e4",
                width: 310,
                height: 220,
                marginHorizontal: 30,
                borderRadius: 20,
                marginVertical: 20,
                fontSize: 16,
              }}
            />
          </View>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: "#00923F", textAlign: "center", marginTop: 20 },
            ]}
            onPress={() => alert("rating:", rating)}
          >
            <Text
              style={[
                styles.buttonText,
                { textAlign: "center", color: "#ffffff" },
              ]}
            >
              Submit
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
  
  function StarRatingNew() {
    const [rating, setRating] = useState(2.5);
    const [starCount, setStarCount] = useState(5);
  
    const star =
      "https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png";
    const star_border =
      "https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png";
  
    const updateRating = (rating) => {
      setRating(rating);
    };
  
    const renderStars = () => {
      const stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push(
          <TouchableOpacity key={i} onPress={() => updateRating(i + 1)}>
            <Image
              style={styles.StarImage}
              source={i < rating ? { uri: star } : { uri: star_border }}
            />
          </TouchableOpacity>
        );
      }
      return stars;
    };
    return (
      <View style={styles.MainContainer}>
        <View style={styles.childView}>{renderStars()}</View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    MainContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingTop: Platform.OS === "ios" ? 20 : 0,
    },
    childView: {
      justifyContent: "center",
      flexDirection: "row",
      marginVertical: 30,
    },
    button: {
      //   justifyContent: 'center',
      //   flexDirection: 'row',
      //   marginTop: 30,
      //   padding: 15,
      //   backgroundColor: '#8ad24e',
    },
    StarImage: {
      width: 40,
      height: 40,
      resizeMode: "cover",
    },
    textStyle: {
      textAlign: "center",
      fontSize: 23,
      color: "#000",
      marginTop: 15,
    },
    textStyleSmall: {
      textAlign: "center",
      fontSize: 16,
  
      color: "#000",
      marginTop: 15,
    },
    successTextContainer: {
      marginTop: 20,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      maxWidth: 224,
      marginLeft: "auto",
      marginRight: "auto",
      marginBottom: 20,
    },
    successText: {
      fontSize: 28,
      fontWeight: "bold",
      textAlign: "center",
    },
    successDetailsText: {
      fontSize: 13,
      textAlign: "center",
      marginVertical: 10,
      maxWidth: 174,
    },
    container: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: "#ffffff",
      height: "100%",
    },
    navigatorContainer: {
      flexDirection: "row",
      paddingVertical: 5,
      height: 40,
      alignItems: "center",
    },
    backButton: {
      width: 30,
      height: 30,
      marginRight: 10,
    },
    main: {
      marginVertical: 10,
    },
    button: {
      backgroundColor: "#F7F7F7",
      paddingVertical: 20,
      paddingHorizontal: 40,
      borderRadius: 15,
      marginVertical: 12,
    },
    buttonSelected: {
      backgroundColor: "#4B4D5A",
    },
    buttonText: {
      color: "#38393D",
      fontSize: 14,
      fontWeight: "bold",
    },
    buttonTextSelected: {
      color: "#FFFFFF",
    },
  });
  