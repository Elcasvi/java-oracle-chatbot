import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

const FilterDropdown = ({ options, onSelectOption }) => {
    const handleOptionClick = (option) => {
        onSelectOption(option);
    };

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button variant="bordered" display="flex" css={{ position: 'relative' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-adjustments-horizontal" width="36" height="36" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M14 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                        <path d="M4 6l8 0" />
                        <path d="M16 6l4 0" />
                        <path d="M8 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                        <path d="M4 12l2 0" />
                        <path d="M10 12l10 0" />
                        <path d="M17 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                        <path d="M4 18l11 0" />
                        <path d="M19 18l1 0" />
                    </svg>
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
