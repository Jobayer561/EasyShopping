import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

const Contact = () => {
  return (
    <div className="max-w-3xl mx-auto p-8 text-center bg-gradient-to-b from-indigo-50 to-white rounded-lg shadow-lg transition-all duration-500 ease-in-out">
      <h1 className="text-4xl font-extrabold mb-6 text-purple-700 transition-transform duration-500 hover:scale-105 inline-block">
        Contact Us
      </h1>
      <p className="text-gray-800 text-lg mb-6 font-medium">
        Feel free to reach out to us at:
      </p>
      <ul className="space-y-4 text-left mx-auto w-max">
        <li className="flex items-center space-x-3 text-purple-800 font-semibold transition-transform duration-500 hover:scale-105">
          <MdEmail className="text-2xl" />
          <span>EasyShopping@gmail.com</span>
        </li>
        <li className="flex items-center space-x-3 text-purple-800 font-semibold transition-transform duration-500 hover:scale-105">
          <MdPhone className="text-2xl" />
          <span>+8801923221401</span>
        </li>
        <li className="flex items-center space-x-3 text-purple-800 font-semibold transition-transform duration-500 hover:scale-105">
          <MdLocationOn className="text-2xl" />
          <span>Chattogram, Bangladesh</span>
        </li>
      </ul>
    </div>
  );
};

export default Contact;
