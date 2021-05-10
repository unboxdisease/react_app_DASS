/* Filter.js */
‍import React, { useState } from "react";import "./filter.css";

‍default function Filter() {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div classname="filter">
‍
      <button onclick={() => setIsOpen(!isOpen)} className="filter__button">Filters</button>
      
‍    </div>
    
  );
}