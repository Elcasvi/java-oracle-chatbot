import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { FilterIcon } from "../assets/icons/filter_icon.tsx";

const FilterDropdown = ({ options, onSelectOption }) => {
    const handleOptionClick = (option) => {
        onSelectOption(option);
    };

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button variant="bordered" display="flex" css={{ position: 'relative' }}>
                    <FilterIcon></FilterIcon>
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions" css={{ position: 'absolute', top: '100%', left: '0' }}>
                {options.map((option, index) => (
                    <DropdownItem key={index} onClick={() => handleOptionClick(option)}>
                        {option}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
};

export default FilterDropdown;
