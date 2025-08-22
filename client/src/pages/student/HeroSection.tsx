import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-r from-blue-500 to bg-indigo-600 dark:from-gray-800 py-24 px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-white text-4xl font-bold mb-4">
          Find Your desrire courses
        </h1>
        <p className="text-gray-200 dark:text-gray-400 mb-8">
          Discover, Learn and Upskill with wide range of courses
        </p>
        <form
          action=""
          className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6"
        >

          <Input
            type="text"
            className="flex-grow border-none focus-visible:ring-0 px-6 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
          ></Input>
          <Button className="bg-gray-700 dark:bg-blue-700 text-white px-6 py-3 rounded-r-full hover-bg-blue-700 dark:hover:bg-blue-800">
            Search
          </Button>
        </form>
        <Button className="bg-gray-700 dark:bg-blue-700 text-white px-6 py-3 rounded-full hover-bg-blue-700 dark:hover:bg-blue-800">
            Explore Courses
        </Button>
      </div>
    </div>
  );
}
