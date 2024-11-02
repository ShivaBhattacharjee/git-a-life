import React from "react";

function Footer() {
  return (
    <footer className="text-center flex items-center font-mono justify-center md:w-[40%]  mx-auto rounded-lg border border-black md:text-2xl text-sm border-1">
      <span>
        Developed by{" "}
        <a className="underline" href="https://x.com/sh17va">
          Shiva
        </a>{" "}
        ,{" "}
        <a className="underline" href="https://x.com/sahil_gulihar_">
          Sahil
        </a>{" "}
      </span>{" "}
    </footer>
  );
}

export default Footer;
