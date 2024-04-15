import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";

const Register = () => {
  return (
    <div>
      <h1>Register</h1>
      <p>Create account</p>
      <Input placeholder="name" />
      <Input placeholder="username" />
      <Input placeholder="password" />
      <Input placeholder="age" />
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
  );
};

export default Register;
