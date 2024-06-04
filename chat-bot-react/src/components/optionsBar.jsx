import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import { FilterIcon } from "../assets/icons/filter_icon.tsx";
import FilterDropdown from "./filterDropdown.jsx";
import "../styles/OptionsBar.css";

function OptionsBar({ onSelectOption, onOpenModal }) {

    const items = [
        {
          key: "new",
          label: "New file",
        },
        {
          key: "copy",
          label: "Copy link",
        },
        {
          key: "edit",
          label: "Edit file",
        },
        {
          key: "delete",
          label: "Delete file",
        }
      ];

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const options = ['Nombre (A-Z)', 'Nombre (Z-A)'];

    return (
        <div className="options-bar-container">
            <Button onClick={onOpenModal}>Add New Task</Button>

            
        <Dropdown style={{ 
                    backgroundColor: '#fff',
                    borderRadius: '10px',  }}>
      <DropdownTrigger>
        <Button 
          variant="bordered" 
        >
          Open Menu
        </Button>
      </DropdownTrigger>
      

      <DropdownMenu aria-label="Dynamic Actions" items={items}>
        {(item) => (
          <DropdownItem
          key={item.key}
          color={item.key === "delete" ? "danger" : "default"}
          className={`custom-dropdown-item ${item.key === "delete" ? "text-danger" : ""}`}
      >
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
      
    </Dropdown>
    

            <div className="my-icon" onClick={toggleDropdown}>
                <FilterIcon />
            </div>
            {isDropdownOpen && (
                <FilterDropdown options={options} onSelectOption={onSelectOption} />
            )}
        </div>
    );
}

export default OptionsBar;
