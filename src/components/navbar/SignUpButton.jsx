import React from "react";
import { Link } from "react-router-dom";

export default function SignUpButton() {
  return (
    <div className="hidden  sm:block">
      <Link to="/signup" className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
        Sign up
      </Link>
    </div>
  );
}
