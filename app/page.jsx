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
Anjali Sharma,22,Female,Reading,Traveling,ENTJ,Madhya Pradesh
Rahul Kumar,26,Male,Cooking,Yoga,ISFJ,Bihar
Pooja Gupta,27,Female,Dancing,Hiking,ESTP,Delhi
Vivek Singh,35,Male,Photography,Writing,INFP,Uttar Pradesh
Neha Sharma,31,Female,Cooking,Traveling,ISTP,Gujarat
Ravi Verma,34,Male,Singing,Reading,ENFJ,Maharashtra
Meera Singh,23,Female,Painting,Yoga,INTJ,Rajasthan
Amit Patel,29,Male,Photography,Dancing,ESFP,Gujarat
Swati Verma,32,Female,Cooking,Hiking,INTP,Karnataka
Rohan Gupta,27,Male,Reading,Traveling,ESTJ,Delhi
Shweta Reddy,36,Female,Singing,Writing,ISFP,Telangana
Alok Sharma,24,Male,Cooking,Dancing,ENTP,Madhya Pradesh
Sneha Patel,37,Female,Photography,Yoga,ESTJ,Gujarat
Vijay Singh,33,Male,Painting,Traveling,ISFJ,Rajasthan
Divya Mehta,25,Female,Cooking,Writing,ESFJ,Maharashtra
Rahul Jain,31,Male,Reading,Hiking,ENFP,Delhi
Priya Verma,28,Female,Singing,Traveling,ISTJ,Uttar Pradesh
Abhishek Sharma,26,Male,Photography,Reading,ESTP,Karnataka
Surbhi Gupta,38,Female,Cooking,Yoga,INFJ,Haryana
Rajat Patel,30,Male,Dancing,Hiking,INTJ,Gujarat
Sonali Kumar,29,Female,Painting,Writing,ESFP,Bihar
Aakash Sharma,32,Male,Reading,Traveling,ENFJ,Maharashtra
Vandana Singh,26,Female,Singing,Yoga,ENTP,Rajasthan
Sachin Gupta,39,Male,Cooking,Dancing,ISFJ,Delhi
Kritika Verma,33,Female,Photography,Writing,ISTP,Gujarat
Vikas Sharma,28,Male,Painting,Hiking,INFP,Haryana
Anita Patel,24,Female,Cooking,Traveling,ESTJ,Madhya Pradesh
Arjun Singh,37,Male,Singing,Yoga,ISFP,Uttar Pradesh
Anjali Gupta,21,Female,Reading,Writing,INTJ,Andhra Pradesh
Rahul Sharma,34,Male,Dancing,Hiking,ESFJ,Karnataka
Pooja Singh,25,Female,Photography,Traveling,ENFP,Maharashtra
Vivek Patel,31,Male,Cooking,Yoga,ISTJ,Gujarat
Neha Verma,30,Female,Singing,Reading,ESTP,Haryana
Ravi Sharma,28,Male,Painting,Hiking,INFJ,Punjab
Meera Jain,26,Female,Reading,Writing,ENTJ,Delhi
Amita Singh,36,Male,Dancing,Traveling,ISFJ,Rajasthan
Swati Sharma,22,Female,Photography,Yoga,INTP,Uttar Pradesh
Rohan Gupta,39,Male,Cooking,Hiking,ESTJ,Maharashtra
Shweta Patel,27,Female,Singing,Writing,ESFP,Delhi
Alok Verma,32,Male,Painting,Traveling,ENFJ,Karnataka
Sneha Sharma,23,Female,Cooking,Yoga,ESTJ,Gujarat
Vijay Kumar,38,Male,Reading,Hiking,ESTP,Haryana
Divya Singh,29,Female,Singing,Traveling,INFJ,Uttar Pradesh
Rahul Verma,24,Male,Painting,Yoga,ENTP,Delhi
Priya Sharma,35,Female,Cooking,Writing,ISFP,Madhya Pradesh
Abhishek Singh,31,Male,Reading,Traveling,INTJ,Gujarat
Surbhi Patel,26,Female,Dancing,Hiking,ESFJ,Rajasthan
Rajat Verma,37,Male,Photography,Reading,INFP,West Bengal
Sonali Gupta,34,Female,Cooking,Traveling,ISTJ,Punjab
Aakash Sharma,28,Male,Singing,Yoga,ESTP,Haryana
Vandana Verma,29,Female,Painting,Writing,ENFJ,Delhi
Sachin Singh,22,Male,Cooking,Traveling,INTP,Uttar Pradesh
Kritika Patel,37,Female,Reading,Traveling,ENTJ,Madhya Pradesh
Vikas Verma,31,Male,Dancing,Yoga,ISFJ,Maharashtra
Anita Sharma,25,Female,Photography,Hiking,INFJ,Rajasthan
Arjun Gupta,33,Male,Cooking,Traveling,ESTJ,Gujarat
Anjali Singh,26,Female,Singing,Reading,ESFP,Haryana
Rahul Kumar,27,Male,Painting,Hiking,INTJ,Gujarat
Pooja Verma,28,Female,Cooking,Yoga,ESTP,Delhi
Vivek Patel,36,Male,Reading,Hiking,ENFP,Uttar Pradesh
Neha Singh,23,Female,Dancing,Traveling,INTJ,Haryana
Ravi Verma,35,Male,Photography,Writing,ISFP,Karnataka
Meera Gupta,31,Female,Cooking,Hiking,ENTP,Gujarat
Amita Sharma,32,Male,Singing,Yoga,ESTJ,Madhya Pradesh
Swati Patel,24,Female,Painting,Writing,ISTP,Gujarat
Rohan Singh,39,Male,Reading,Writing,ISTJ,Uttar Pradesh
Shweta Verma,25,Female,Cooking,Hiking,ESFJ,Haryana
Alok Sharma,29,Male,Dancing,Traveling,INTP,Delhi
Sneha Gupta,37,Female,Photography,Yoga,ENFJ,Maharashtra
Vijay Verma,22,Male,Cooking,Hiking,ENTJ,Gujarat
Divya Singh,34,Female,Singing,Traveling,ESFP,Haryana
Rahul Patel,31,Male,Painting,Yoga,INFP,Karnataka
Priya Verma,28,Female,Reading,Writing,ESTP,Delhi
Abhishek Kumar,26,Male,Cooking,Hiking,INFJ,Bihar
Surbhi Sharma,33,Female,Singing,Traveling,ISFJ,Uttar Pradesh
Rajat Verma,27,Male,Photography,Yoga,ENFP,Haryana
Sonali Gupta,35,Female,Cooking,Writing,INTJ,Madhya Pradesh
Aakash Sharma,30,Male,Painting,Hiking,ESTJ,Gujarat
Vandana Verma,24,Female,Dancing,Traveling,ISFP,Delhi
Sachin Singh,36,Male,Reading,Yoga,ENTP,Rajasthan
Kritika Patel,29,Female,Photography,Hiking,INTJ,Karnataka
Vikas Verma,31,Male,Cooking,Writing,ESFP,Uttar Pradesh
Anita Sharma,27,Female,Singing,Traveling,ESTJ,Gujarat
Arjun Gupta,22,Male,Painting,Yoga,INFJ,Maharashtra
Anjali Singh,35,Female,Cooking,Hiking,ENTJ,Haryana
Rahul Kumar,28,Male,Dancing,Traveling,ISTP,Punjab
Pooja Verma,34,Female,Photography,Yoga,ESTP,Uttar Pradesh
Vivek Patel,25,Male,Cooking,Hiking,INTP,Gujarat
Neha Singh,37,Female,Singing,Traveling,ENFJ,Delhi
Ravi Verma,30,Male,Painting,Writing,ISFJ,Uttar Pradesh
Meera Gupta,33,Female,Reading,Yoga,ESTJ,Haryana
Amita Sharma,26,Male,Dancing,Hiking,INFP,Madhya Pradesh
Swati Patel,29,Female,Photography,Traveling,ENTJ,Gujarat
Rohan Singh,31,Male,Cooking,Yoga,INTJ,Punjab
Shweta Verma,24,Female,Singing,Hiking,ESFP,Haryana
Alok Sharma,35,Male,Painting,Writing,ENFP,Karnataka
Sneha Gupta,27,Female,Cooking,Traveling,ISTJ,Uttar Pradesh
Vijay Verma,32,Male,Dancing,Yoga,ESFJ,Maharashtra
Divya Singh,26,Female,Photography,Writing,ESTJ,Rajasthan
Rahul Patel,23,Male,Cooking,Hiking,INFJ,Uttar Pradesh
Priya Verma,36,Female,Singing,Traveling,ESTP,Gujarat
Abhishek Kumar,30,Male,Painting,Yoga,INTP,Haryana
Surbhi Sharma,28,Female,Reading,Hiking,ENFJ,Karnataka
Rajat Verma,37,Male,Photography,Writing,ISFP,Uttar Pradesh
Sonali Gupta,25,Female,Cooking,Traveling,ISTP,Delhi
Aakash Sharma,33,Male,Dancing,Yoga,ENTP,Gujarat
Vandana Verma,29,Female,Painting,Hiking,INTJ,Punjab
Sachin Singh,31,Male,Reading,Traveling,ESTJ,Madhya Pradesh
Kritika Patel,27,Female,Photography,Yoga,INFP,Gujarat
Vikas Verma,24,Male,Cooking,Hiking,ENTJ,Maharashtra
Anita Sharma,38,Female,Singing,Traveling,ISFJ,Haryana
Arjun Gupta,26,Male,Painting,Writing,ESFJ,Rajasthan
Anjali Singh,32,Female,Cooking,Yoga,INFJ,Delhi
Rahul Kumar,25,Male,Dancing,Hiking,ESTP,Punjab
Pooja Verma,37,Female,Photography,Writing,INTP,Uttar Pradesh
Vivek Patel,29,Male,Cooking,Yoga,ENFP,Karnataka
Neha Singh,23,Female,Singing,Traveling,ESFJ,Gujarat
Ravi Verma,35,Male,Painting,Hiking,ENTJ,Maharashtra
Meera Gupta,30,Female,Reading,Yoga,ISFP,Haryana
Amita Sharma,28,Male,Dancing,Traveling,ISTJ,Uttar Pradesh
Swati Patel,36,Female,Photography,Hiking,ESTJ,Gujarat
Rohan Singh,26,Male,Cooking,Yoga,INFP,Karnataka
Shweta Verma,32,Female,Singing,Writing,INTJ,Rajasthan
Alok Sharma,24,Male,Painting,Traveling,ENFJ,Maharashtra
Sneha Gupta,27,Female,Cooking,Yoga,ENTP,Gujarat
Vijay Verma,34,Male,Dancing,Hiking,ESFP,Uttar Pradesh
Divya Singh,29,Female,Photography,Writing,ESTP,Haryana
Rahul Patel,31,Male,Reading,Traveling,INFJ,Delhi
Priya Verma,25,Female,Singing,Yoga,ISTP,Punjab
Abhishek Kumar,38,Male,Painting,Writing,ENFP,Maharashtra
Surbhi Sharma,26,Female,Cooking,Traveling,ISFJ,West Bengal
Rajat Verma,33,Male,Photography,Yoga,ENTJ,Rajasthan
Sonali Gupta,27,Female,Dancing,Hiking,INTJ,Delhi
Aakash Sharma,22,Male,Painting,Writing,ESFP,Uttar Pradesh
Vandana Verma,29,Female,Cooking,Traveling,ESTJ,Gujarat
Sachin Singh,35,Male,Singing,Yoga,INFP,Karnataka
Kritika Patel,30,Female,Reading,Hiking,ISTJ,Madhya Pradesh
Vikas Verma,26,Male,Photography,Writing,ESTP,Punjab
Anita Sharma,32,Female,Cooking,Traveling,INTP,Gujarat
Arjun Gupta,28,Male,Dancing,Yoga,ENFJ,Rajasthan
Anjali Singh,24,Female,Painting,Traveling,ISFP,Delhi
Rahul Kumar,31,Male,Reading,Hiking,ESFJ,Madhya Pradesh
Pooja Verma,37,Female,Singing,Yoga,ENTP,Gujarat
Vivek Patel,29,Male,Photography,Traveling,INTJ,Uttar Pradesh
Neha Singh,35,Female,Cooking,Hiking,ESFP,Haryana
Ravi Verma,27,Male,Painting,Writing,ESTJ,Delhi
Meera Gupta,23,Female,Dancing,Traveling,ENFJ,Maharashtra
Amita Sharma,36,Male,Photography,Yoga,ISFJ,Rajasthan
Swati Patel,26,Female,Cooking,Hiking,INFJ,Gujarat
Rohan Singh,32,Male,Singing,Writing,ISTP,Madhya Pradesh
Shweta Verma,29,Female,Painting,Yoga,ESTP,Uttar Pradesh
Alok Sharma,25,Male,Reading,Hiking,INTJ,Bihar
Sneha Gupta,33,Female,Cooking,Traveling,ENTJ,Delhi
Vijay Verma,27,Male,Photography,Yoga,INFP,Uttar Pradesh
Divya Singh,31,Female,Dancing,Writing,ENFP,Karnataka
Rahul Patel,24,Male,Painting,Hiking,ESTJ,Gujarat
Priya Verma,28,Female,Reading,Traveling,ISFP,Rajasthan
Abhishek Kumar,37,Male,Singing,Yoga,ENTP,Haryana
Surbhi Sharma,26,Female,Photography,Hiking,ISTJ,Maharashtra
Rajat Verma,30,Male,Cooking,Traveling,INTJ,Punjab
Sonali Gupta,22,Female,Painting,Yoga,ESFP,Delhi
Aakash Sharma,35,Male,Reading,Writing,INFJ,Gujarat
Vandana Verma,29,Female,Singing,Traveling,ESTP,Uttar Pradesh
Sachin Singh,33,Male,Photography,Yoga,ISFJ,Rajasthan
Kritika Patel,27,Female,Cooking,Hiking,ENFJ,Gujarat
Vikas Verma,24,Male,Dancing,Traveling,ESTJ,Haryana
Anita Sharma,31,Female,Painting,Yoga,INFP,Uttar Pradesh
Arjun Gupta,26,Male,Reading,Hiking,ENTJ,Maharashtra
Anjali Singh,34,Female,Singing,Traveling,INTJ,Rajasthan
Rahul Kumar,30,Male,Photography,Writing,ESFP,Delhi
Pooja Verma,28,Female,Cooking,Yoga,ISTP,Gujarat
Vivek Patel,25,Male,Painting,Hiking,ENTP,Madhya Pradesh
Neha Singh,37,Female,Reading,Traveling,INTP,Haryana
Ravi Verma,27,Male,Dancing,Yoga,ESTJ,Punjab
Meera Gupta,31,Female,Photography,Writing,ISFJ,Maharashtra
Amita Sharma,23,Male,Cooking,Hiking,ENFJ,Uttar Pradesh
Swati Patel,36,Female,Singing,Traveling,INFJ,Gujarat
Rohan Singh,29,Male,Painting,Yoga,ESTP,Rajasthan
Shweta Verma,24,Female,Reading,Hiking,ENTJ,Delhi
Alok Sharma,32,Male,Photography,Writing,ISFP,Uttar Pradesh
Sneha Gupta,28,Female,Dancing,Yoga,INTJ,Gujarat
Vijay Verma,34,Male,Cooking,Traveling,ESFJ,Haryana
Divya Singh,26,Female,Painting,Hiking,ENTP,Rajasthan
Rahul Patel,31,Male,Singing,Traveling,ISTJ,Karnataka
Priya Verma,25,Female,Reading,Yoga,ENFP,Maharashtra
Abhishek Kumar,37,Male,Photography,Writing,INTP,Punjab
Surbhi Sharma,29,Female,Cooking,Hiking,ESTJ,Madhya Pradesh
Rajat Verma,33,Male,Dancing,Traveling,INFP,Delhi
Sonali Gupta,22,Female,Painting,Yoga,ENTJ,Maharashtra
Aakash Sharma,35,Male,Reading,Hiking,ISFP,Haryana
Vandana Verma,27,Female,Cooking,Traveling,ESFP,Karnataka
Sachin Singh,33,Male,Photography,Yoga,INFJ,Uttar Pradesh
Kritika Patel,27,Female,Dancing,Hiking,ESTP,Gujarat
Vikas Verma,24,Male,Painting,Writing,ISFJ,Rajasthan
Anita Sharma,31,Female,Cooking,Yoga,ENFJ,Madhya Pradesh
Arjun Gupta,26,Male,Singing,Traveling,INTJ,Delhi
Anjali Singh,34,Female,Photography,Writing,ENTP,Haryana
Rahul Kumar,30,Male,Reading,Yoga,ISTP,Karnataka
Pooja Verma,28,Female,Painting,Hiking,ESTJ,Uttar Pradesh
Vivek Patel,25,Male,Dancing,Traveling,ENFP,Gujarat
Neha Singh,37,Female,Cooking,Yoga,INTJ,Punjab
Ravi Verma,27,Male,Photography,Hiking,ESFJ,Rajasthan
Meera Gupta,31,Female,Singing,Writing,ISFP,Delhi
Amita Sharma,23,Male,Cooking,Traveling,INFP,Madhya Pradesh
Swati Patel,36,Female,Painting,Yoga,ESTP,Uttar Pradesh
Rohan Singh,29,Male,Reading,Writing,ENTJ,Gujarat
Shweta Verma,24,Female,Dancing,Traveling,ISFJ,Delhi
Alok Sharma,32,Male,Photography,Hiking,INFJ,Maharashtra
Sneha Gupta,28,Female,Cooking,Writing,ENTP,Uttar Pradesh
Vijay Verma,34,Male,Singing,Yoga,ESTJ,Gujarat
Divya Singh,26,Female,Painting,Traveling,INTP,Haryana
Rahul Patel,31,Male,Photography,Writing,ESFP,Karnataka
Priya Verma,25,Female,Cooking,Hiking,ISTJ,Rajasthan
Abhishek Kumar,37,Male,Dancing,Yoga,ENFJ,Uttar Pradesh
Surbhi Sharma,29,Female,Reading,Traveling,INTJ,Madhya Pradesh
Rajat Verma,33,Male,Painting,Hiking,ESTP,Haryana
Sonali Gupta,22,Female,Photography,Writing,INFP,Delhi
Aakash Sharma,35,Male,Cooking,Traveling,ISFP,Uttar Pradesh
Vandana Verma,27,Female,Singing,Yoga,ENTJ,Gujarat
Sachin Singh,33,Male,Painting,Writing,ESFJ,Rajasthan
Kritika Patel,27,Female,Cooking,Hiking,INFJ,Uttar Pradesh
Vikas Verma,24,Male,Photography,Yoga,ESTJ,Maharashtra
Anita Sharma,31,Female,Dancing,Traveling,ISTP,Punjab
Arjun Gupta,26,Male,Reading,Hiking,INTP,Gujarat
Anjali Singh,34,Female,Painting,Writing,ENFP,Haryana
Rahul Kumar,30,Male,Singing,Traveling,ISFJ,Karnataka
Pooja Verma,28,Female,Cooking,Yoga,ESTP,Uttar Pradesh
Vivek Patel,25,Male,Photography,Hiking,INTJ,Gujarat
Neha Singh,37,Female,Dancing,Traveling,ESFP,Haryana
Ravi Verma,27,Male,Cooking,Yoga,ENTP,Delhi
Meera Gupta,31,Female,Reading,Writing,ISTJ,Uttar Pradesh
Amita Sharma,23,Male,Singing,Yoga,ESFJ,Maharashtra
Swati Patel,36,Female,Painting,Traveling,ENTJ,Rajasthan
Rohan Singh,29,Male,Cooking,Hiking,INFJ,Haryana
Shweta Verma,24,Female,Photography,Writing,ESTJ,Delhi
Alok Sharma,32,Male,Dancing,Yoga,INFP,Karnataka
Sneha Gupta,28,Female,Cooking,Traveling,INTP,Gujarat
Vijay Verma,34,Male,Painting,Hiking,ENFJ,Uttar Pradesh
Divya Singh,26,Female,Singing,Yoga,ESTP,Rajasthan
Rahul Patel,31,Male,Reading,Writing,ISFP,Madhya Pradesh
Priya Verma,25,Female,Photography,Hiking,ENFJ,Karnataka
Abhishek Kumar,37,Male,Cooking,Traveling,ISTJ,Gujarat
Surbhi Sharma,29,Female,Singing,Yoga,INTJ,Maharashtra
Rajat Verma,33,Male,Painting,Traveling,ESTP,Rajasthan
Sonali Gupta,22,Female,Reading,Hiking,ENTP,Delhi
Aakash Sharma,35,Male,Photography,Yoga,INFJ,Karnataka
Vandana Verma,27,Female,Cooking,Writing,ESFJ,Uttar Pradesh
Sachin Singh,33,Male,Dancing,Traveling,INTP,Haryana
Kritika Patel,27,Female,Painting,Yoga,ENFP,Punjab
Vikas Verma,24,Male,Reading,Hiking,ISFJ,Gujarat
Anita Sharma,31,Female,Photography,Writing,ESTJ,Haryana
Arjun Gupta,26,Male,Cooking,Traveling,INFP,Maharashtra
Anjali Singh,34,Female,Singing,Hiking,ISTP,Delhi
Rahul Kumar,30,Male,Painting,Yoga,ESFP,Uttar Pradesh
Pooja Verma,28,Female,Dancing,Traveling,ENFJ,Gujarat
Vivek Patel,25,Male,Cooking,Hiking,INTJ,Madhya Pradesh
Neha Singh,37,Female,Reading,Writing,ESTP,Haryana
Ravi Verma,27,Male,Photography,Traveling,ISFJ,Punjab
Meera Gupta,31,Female,Singing,Yoga,ENTJ,Maharashtra
Amita Sharma,23,Male,Painting,Writing,INFJ,Rajasthan
Swati Patel,36,Female,Cooking,Hiking,INTP,Delhi
Rohan Singh,29,Male,Photography,Traveling,ESTJ,Karnataka
Shweta Verma,24,Female,Singing,Yoga,ESFP,Uttar Pradesh
Alok Sharma,32,Male,Reading,Hiking,ENTP,Gujarat
Sneha Gupta,28,Female,Painting,Writing,ISTJ,Maharashtra
Vijay Verma,34,Male,Cooking,Traveling,ENFJ,Punjab
Divya Singh,26,Female,Singing,Hiking,ESTP,Delhi
Rahul Patel,31,Male,Photography,Writing,ISFP,Uttar Pradesh
Priya Verma,25,Female,Cooking,Traveling,INFJ,Gujarat
Abhishek Kumar,37,Male,Dancing,Yoga,ISTJ,Rajasthan
Surbhi Sharma,29,Female,Reading,Hiking,ENFP,Haryana
Rajat Verma,33,Male,Painting,Yoga,ISFJ,Maharashtra
Sonali Gupta,22,Female,Photography,Traveling,INTP,Uttar Pradesh
Aakash Sharma,35,Male,Cooking,Hiking,ESTJ,Karnataka
Vandana Verma,27,Female,Singing,Writing,ESFJ,Delhi
Sachin Singh,33,Male,Photography,Traveling,ENTJ,Karnataka
Kritika Patel,27,Female,Painting,Yoga,INTJ,Haryana
Vikas Verma,24,Male,Cooking,Traveling,ESTP,Madhya Pradesh
Anita Sharma,31,Female,Dancing,Hiking,INFP,Gujarat
Arjun Gupta,26,Male,Reading,Yoga,ENTP,Rajasthan
Anjali Singh,34,Female,Photography,Writing,ISTP,Delhi
Rahul Kumar,30,Male,Singing,Traveling,ESFP,Karnataka
Pooja Verma,28,Female,Cooking,Yoga,ENFJ,Maharashtra
Vivek Patel,25,Male,Painting,Hiking,ISFP,Punjab
Neha Singh,37,Female,Dancing,Writing,ESTJ,Haryana
Ravi Verma,27,Male,Reading,Traveling,INFP,Uttar Pradesh
Meera Gupta,31,Female,Photography,Hiking,ENTJ,Gujarat
Amita Sharma,23,Male,Singing,Traveling,INTJ,Rajasthan
Swati Patel,36,Female,Cooking,Yoga,ISFJ,Maharashtra
Rohan Singh,29,Male,Painting,Writing,ESTP,Karnataka
Shweta Verma,24,Female,Dancing,Traveling,ENFP,Haryana
Alok Sharma,32,Male,Photography,Hiking,INTP,Delhi
Sneha Gupta,28,Female,Cooking,Writing,ESFP,Uttar Pradesh
Vijay Verma,34,Male,Singing,Yoga,ESTJ,Gujarat
Divya Singh,26,Female,Painting,Traveling,INFJ,Rajasthan
Rahul Patel,31,Male,Reading,Hiking,ENTJ,Maharashtra
Priya Verma,25,Female,Photography,Yoga,ESTP,Karnataka
Abhishek Kumar,37,Male,Cooking,Traveling,ISFP,Punjab
Surbhi Sharma,29,Female,Dancing,Writing,INTJ,Gujarat
Rajat Verma,33,Male,Painting,Traveling,ESTJ,Uttar Pradesh
Sonali Gupta,22,Female,Singing,Yoga,INFP,Delhi
Aakash Sharma,35,Male,Photography,Hiking,ESFJ,Maharashtra
Vandana Verma,27,Female,Cooking,Traveling,ENFJ,Delhi
Sachin Singh,33,Male,Singing,Yoga,ISTP,Uttar Pradesh
Kritika Patel,27,Female,Reading,Hiking,ESTP,Gujarat
Vikas Verma,24,Male,Painting,Writing,INTP,Rajasthan
Anita Sharma,31,Female,Photography,Yoga,ENFJ,Uttar Pradesh
Arjun Gupta,26,Male,Cooking,Writing,ISFJ,Haryana
Anjali Singh,34,Female,Dancing,Traveling,INFJ,Madhya Pradesh
Rahul Kumar,30,Male,Painting,Hiking,ENTP,Delhi
Pooja Verma,28,Female,Singing,Yoga,INTJ,Gujarat
Vivek Patel,25,Male,Cooking,Traveling,ESFP,Maharashtra
Neha Singh,37,Female,Photography,Writing,ISTJ,Uttar Pradesh
Ravi Verma,27,Male,Dancing,Hiking,INFP,Haryana
Meera Gupta,31,Female,Cooking,Yoga,ESTJ,Rajasthan
Amita Sharma,23,Male,Painting,Traveling,ENFP,Uttar Pradesh
Swati Patel,36,Female,Singing,Writing,ISFP,Gujarat
Rohan Singh,29,Male,Cooking,Yoga,INTJ,Punjab
Shweta Verma,24,Female,Photography,Hiking,ESTP,Delhi
Alok Sharma,32,Male,Dancing,Writing,INFJ,Karnataka
Sneha Gupta,28,Female,Cooking,Traveling,ENTJ,Maharashtra
Vijay Verma,34,Male,Painting,Yoga,INTP,Uttar Pradesh
Divya Singh,26,Female,Singing,Traveling,ENFJ,Haryana
Rahul Patel,31,Male,Reading,Writing,ESTJ,Rajasthan
Priya Verma,25,Female,Painting,Hiking,ENTP,Delhi
Abhishek Kumar,37,Male,Cooking,Yoga,INTJ,Punjab
Surbhi Sharma,29,Female,Photography,Writing,ESFJ,Gujarat
Rajat Verma,33,Male,Dancing,Hiking,ISTP,Uttar Pradesh
Sonali Gupta,22,Female,Cooking,Traveling,ESTP,Madhya Pradesh
Aakash Sharma,35,Male,Singing,Yoga,INFP,Maharashtra
Vandana Verma,27,Female,Painting,Writing,ENTJ,Karnataka
Sachin Singh,33,Male,Reading,Traveling,ISFP,Uttar Pradesh
Kritika Patel,27,Female,Photography,Yoga,ENFJ,Punjab
Vikas Verma,24,Male,Cooking,Hiking,ISTJ,Rajasthan
Anita Sharma,31,Female,Reading,Traveling,INFJ,Delhi
Arjun Gupta,26,Male,Painting,Yoga,ESTJ,Uttar Pradesh
Anjali Singh,34,Female,Singing,Hiking,INTP,Gujarat
Rahul Kumar,30,Male,Photography,Writing,ESFP,Maharashtra
Pooja Verma,28,Female,Cooking,Traveling,ENTP,Uttar Pradesh
Vivek Patel,25,Male,Painting,Yoga,INTJ,Karnataka
Neha Singh,37,Female,Singing,Writing,ESTJ,Haryana
Ravi Verma,27,Male,Cooking,Traveling,INFP,Punjab
Meera Gupta,31,Female,Reading,Hiking,ENFJ,Delhi
Amita Sharma,23,Male,Photography,Yoga,ISFP,Rajasthan
Swati Patel,36,Female,Dancing,Traveling,ESTP,Maharashtra
Rohan Singh,29,Male,Cooking,Hiking,INTJ,Gujarat
Shweta Verma,24,Female,Reading,Yoga,ENTJ,Haryana
Alok Sharma,32,Male,Painting,Writing,INFJ,Delhi
Sneha Gupta,28,Female,Cooking,Traveling,ISTP,Uttar Pradesh
Vijay Verma,34,Male,Photography,Hiking,ESFJ,Punjab
Divya Singh,26,Female,Dancing,Yoga,ESTJ,Rajasthan
Rahul Patel,31,Male,Cooking,Writing,ENFP,Karnataka
Priya Verma,25,Female,Painting,Hiking,INTP,Uttar Pradesh
Abhishek Kumar,37,Male,Singing,Traveling,ENFJ,Gujarat
Surbhi Sharma,29,Female,Photography,Yoga,ISFJ,Rajasthan
Rajat Verma,33,Male,Cooking,Hiking,ESTP,Uttar Pradesh
Sonali Gupta,22,Female,Reading,Traveling,INFP,Maharashtra
Aakash Sharma,35,Male,Painting,Writing,INTJ,Haryana
Vandana Verma,27,Female,Singing,Traveling,ESFP,Karnataka
Sachin Singh,33,Male,Photography,Yoga,ISTJ,Delhi
Kritika Patel,27,Female,Cooking,Hiking,INFJ,Punjab
Vikas Verma,24,Male,Painting,Yoga,ENTP,Gujarat
Anita Sharma,31,Female,Dancing,Writing,ISFJ,Haryana
Arjun Gupta,26,Male,Photography,Traveling,ESTJ,Rajasthan
Anjali Singh,34,Female,Cooking,Yoga,INTP,Uttar Pradesh
Rahul Kumar,30,Male,Singing,Hiking,ENFP,Karnataka
Pooja Verma,28,Female,Painting,Writing,INTJ,Haryana
Vivek Patel,25,Male,Cooking,Traveling,ESTP,Delhi
Neha Singh,37,Female,Reading,Yoga,INFJ,Uttar Pradesh
Ravi Verma,27,Male,Photography,Hiking,ENTJ,Gujarat
Meera Gupta,31,Female,Singing,Traveling,ISTP,Punjab
Amita Sharma,23,Male,Cooking,Yoga,ESFJ,Maharashtra
Swati Patel,36,Female,Painting,Traveling,INFP,Rajasthan
Rohan Singh,29,Male,Dancing,Yoga,ESTJ,Gujarat
Shweta Verma,24,Female,Photography,Hiking,ENTP,Uttar Pradesh
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
