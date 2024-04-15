"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import OpenAI from "openai";

const csvData = `
Name, Age, Gender, Hobby1, Hobby2, MBTI, State
Sakshi Kumar,25,Female,Photography,Dancing,ISFP,Maharashtra
Rahul Gupta,33,Male,Cooking,Traveling,ESTJ,Delhi
Mohan Sharma,29,Male,Reading,Writing,INTJ,Rajasthan
Nisha Patel,28,Female,Cooking,Hiking,ESFP,Gujarat
Amita Das,30,Female,Singing,Yoga,ENFJ,Maharashtra
`;

const Home = () => {
  const router = useRouter();
  const openai = new OpenAI({
    apiKey: "api-key",
    dangerouslyAllowBrowser: true,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [chat_data, setChat_data] = useState({});
  const [selectedUser, setSelectedUser] = useState();
  const [selectedHobby, setSelectedHobby] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedPersonalityType, setSelectedPersonalityType] = useState("");
  const [chatString, setChatString] = useState("");

  const lines = csvData.trim().split("\n").slice(1); // Remove header and split by lines
  const students = lines.map((line) => {
    const [Name, Age, Gender, Hobby1, Hobby2, MBTI, State] = line.split(",");
    return { Name, Age, Gender, Hobby1, Hobby2, MBTI, State };
  });

  const filteredStudents = students.filter((student) => {
    // Check if name contains search term
    const nameMatch = student.Name.toLowerCase().includes(
      searchTerm.toLowerCase()
    );
    // Check if hobby matches selected hobby
    const hobbyMatch =
      selectedHobby === "" ||
      student.Hobby1.toLowerCase() === selectedHobby.toLowerCase() ||
      student.Hobby2.toLowerCase() === selectedHobby.toLowerCase();
    // Check if gender matches selected gender
    const genderMatch =
      selectedGender === "" ||
      student.Gender.toLowerCase() === selectedGender.toLowerCase();

    const stateMatch =
      selectedState === "" ||
      student.State.toLowerCase() === selectedState.toLowerCase();

    const personlityMatch =
      selectedPersonalityType === "" ||
      student.MBTI.toLowerCase() === selectedPersonalityType.toLowerCase();

    // Return true if all conditions match
    return (
      nameMatch && hobbyMatch && genderMatch && stateMatch && personlityMatch
    );
  });

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
    }
  }, []);

  const StudentCard = ({ student }) => {
    const { Name, Age, Gender, Hobby1, Hobby2, MBTI, State } = student;

    return (
      <div
        className="p-4 rounded-lg flex flex-col items-center bg-[#ffffff60] hover:scale-105 transition"
        onClick={() => setSelectedUser(student)}
      >
        <div>
          <img
            src={
              Gender === "Male"
                ? `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3q9EpHgNKXgcHBMHDiiGFx674dEpaCq5uVFFcwXolIw&s`
                : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ0wjTBRZnnxXpV0Qai0QpeyTGofaRZI8wCNQ4mkwIkg&s`
            }
            className="w-24 h-24 border rounded-full"
          />
        </div>
        <div className="flex flex-col items-center">
          <h3 className="font-semibold text-[1.5em]">{Name}</h3>
          <div className="flex gap-2">
            <p>
              {Age}
              <span className="italic">Years</span>{" "}
            </p>
            <p>{Gender}</p>
          </div>

          <div className="my-4">
            <p>
              Interested in <span className="italic">{Hobby1}</span> and{" "}
              <span className="italic">{Hobby2}</span>. Hails from{" "}
              <span className="italic">{State}</span> . Personality type is{" "}
              <span className="italic">{MBTI}</span>
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Define a function to send user's message to OpenAI and get response
  const getOpenAIResponse = async (message) => {
    try {
      const response = await openai.complete({
        engine: "text-davinci-002", // Use the Davinci model
        prompt: message,
        maxTokens: 50,
      });
      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error("Error:", error);
      return "Sorry, I could not generate a response at the moment.";
    }
  };

  const handleEnterChatClick = async (msg) => {
    if (!selectedUser) {
      return;
    }
    const response = await getOpenAIResponse(msg); // Get response from OpenAI
    const updatedChatData = { ...chat_data };
    if (updatedChatData[selectedUser.Name]) {
      updatedChatData[selectedUser.Name] = [
        ...updatedChatData[selectedUser.Name],
        { by: "we", msg },
        { by: "AI", msg: response }, // Include AI response in chat data
      ];
    } else {
      updatedChatData[selectedUser.Name] = [
        { by: "we", msg },
        { by: "AI", msg: response }, // Include AI response in chat data
      ];
    }
    setChat_data(updatedChatData);
    setChatString("");
    localStorage.setItem("chat_data", JSON.stringify(updatedChatData));
  };

  // const handleEnterChatClick = (msg) => {
  //   if (!selectedUser) {
  //     return;
  //   }
  //   const updatedChatData = { ...chat_data };
  //   if (updatedChatData[selectedUser.Name]) {
  //     updatedChatData[selectedUser.Name] = [
  //       ...updatedChatData[selectedUser.Name],
  //       { by: "we", msg },
  //     ];
  //   } else {
  //     updatedChatData[selectedUser.Name] = [{ by: "we", msg }];
  //   }
  //   setChat_data(updatedChatData);
  //   setChatString("");
  //   localStorage.setItem("chat_data", JSON.stringify(updatedChatData));
  // };

  useEffect(() => {
    (async () => {
      let chat_data = await localStorage.getItem("chat_data");
      if (chat_data) {
        chat_data = JSON.parse(chat_data);
        setChat_data(chat_data);
      }
    })();
  }, []);

  return (
    <div className="p-2">
      <h1 className="text-3xl font-semibold my-5 text-center">
        Explore People Around You !
      </h1>
      <Input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-[#ffffff90] mb-3 border-none"
      />

      <div className="flex gap-3 mb-3">
        <Select onValueChange={(value) => setSelectedHobby(value)}>
          <SelectTrigger className="w-[180px] bg-[#ffffff90] border-none">
            <SelectValue placeholder="Filter by hobby" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Hobby</SelectLabel>
              <SelectItem value="photography">Photography</SelectItem>
              <SelectItem value="dancing">Dancing</SelectItem>
              <SelectItem value="travelling">Travelling</SelectItem>
              <SelectItem value="cooking">Cooking</SelectItem>
              <SelectItem value="reading">Reading</SelectItem>
              <SelectItem value="writing">Writing</SelectItem>
              <SelectItem value="hiking">Hiking</SelectItem>
              <SelectItem value="singing">Singing</SelectItem>
              <SelectItem value="yoga">Yoga</SelectItem>
              <SelectItem value="painting">Painting</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => setSelectedGender(value)}>
          <SelectTrigger className="w-[180px] bg-[#ffffff90] border-none">
            <SelectValue placeholder="Filter by gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Gender (LGBTQ not allowed)</SelectLabel>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => setSelectedState(value)}>
          <SelectTrigger className="w-[180px] bg-[#ffffff90] border-none">
            <SelectValue placeholder="Filter by State" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Choose State</SelectLabel>
              <SelectItem value="maharashtra">Maharashtra</SelectItem>
              <SelectItem value="delhi">Delhi</SelectItem>
              <SelectItem value="rajasthan">Rajasthan</SelectItem>
              <SelectItem value="gujarat">Gujarat</SelectItem>
              <SelectItem value="madhya pradesh">Madhya Pradesh</SelectItem>
              <SelectItem value="bihar">Bihar</SelectItem>
              <SelectItem value="uttar pradesh">Uttar Pradesh</SelectItem>
              <SelectItem value="karnataka">Karnataka</SelectItem>
              <SelectItem value="telangana">Telangana</SelectItem>
              <SelectItem value="haryana">Haryana</SelectItem>
              <SelectItem value="andhra pradesh">Andhra Pradesh</SelectItem>
              <SelectItem value="west bengal">West Bengal</SelectItem>
              <SelectItem value="punjab">Punjab</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => setSelectedPersonalityType(value)}>
          <SelectTrigger className="w-[180px] bg-[#ffffff90] border-none">
            <SelectValue placeholder="Filter by Personality" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Choose MBTI</SelectLabel>
              <SelectItem value="isfp">ISFP</SelectItem>
              <SelectItem value="estj">ESTJ</SelectItem>
              <SelectItem value="intj">INTJ</SelectItem>
              <SelectItem value="esfp">ESFP</SelectItem>
              <SelectItem value="enfj">ENFJ</SelectItem>
              <SelectItem value="isfj">ISFJ</SelectItem>
              <SelectItem value="estp">ESTP</SelectItem>
              <SelectItem value="infp">INFP</SelectItem>
              <SelectItem value="istp">ISTP</SelectItem>
              <SelectItem value="entp">ENTP</SelectItem>
              <SelectItem value="esfj">ESFJ</SelectItem>
              <SelectItem value="infj">INFJ</SelectItem>
              <SelectItem value="istj">ISTJ</SelectItem>
              <SelectItem value="enfp">ENFP</SelectItem>
              <SelectItem value="intp">INTP</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-4 gap-4 h-screen overflow-y-scroll">
        {filteredStudents.map((student, index) => (
          <Drawer key={index}>
            <DrawerTrigger>
              {" "}
              <StudentCard student={student} />
            </DrawerTrigger>
            <DrawerContent>
              <div className="flex mx-auto min-h-[50vh] w-1/2 p-4">
                <div className="flex flex-col justify-between w-full">
                  <div className="flex flex-col items-center">
                    <img
                      src={
                        selectedUser?.Gender === "Male"
                          ? `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3q9EpHgNKXgcHBMHDiiGFx674dEpaCq5uVFFcwXolIw&s`
                          : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ0wjTBRZnnxXpV0Qai0QpeyTGofaRZI8wCNQ4mkwIkg&s`
                      }
                      className="w-24 h-24 border rounded-full"
                    />
                    {/* Info container */}
                    <div className="flex flex-col">
                      <h3 className="font-semibold text-[1.5em] text-center">
                        {selectedUser?.Name}
                      </h3>
                      <div className="flex gap-2">
                        <p>
                          {selectedUser?.Age}
                          <span className="italic">Years</span>{" "}
                        </p>
                        <p>{selectedUser?.Gender},</p>
                        <p>{selectedUser?.State}</p>
                      </div>
                    </div>
                  </div>

                  {/* chat container */}
                  <div>
                    {/* chat box */}
                    <div className="h-[25vh] overflow-y-scroll">
                      {chat_data[selectedUser?.Name]?.map((chat, index) => (
                        <div
                          key={index}
                          className={`my-1 ${
                            chat.by === "we" ? "text-right" : "text-left"
                          }`}
                        >
                          <p
                            className={`${
                              chat.by === "we"
                                ? "bg-[#4CAF50] text-white"
                                : "bg-[#f1f1f1]"
                            } py-2 px-3 rounded-lg inline-block`}
                          >
                            {chat.msg}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-1">
                      <Input
                        placeholder="chat now ..."
                        onChange={(e) => setChatString(e.target.value)}
                      />
                      <Button
                        onClick={() => handleEnterChatClick(chatString)}
                        className="bg-gray-500"
                        disabled={!chatString}
                      >{`>`}</Button>
                    </div>
                  </div>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        ))}
      </div>
    </div>
  );
};

export default Home;
