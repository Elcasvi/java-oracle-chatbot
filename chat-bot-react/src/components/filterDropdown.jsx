import React from 'react';

const FilterDropdown = ({ options, onSelectOption }) => {
    const handleOptionClick = (option) => {
        onSelectOption(option);
    };

    return (
        <div className="filter-dropdown">
            <ul>
                {options.map(option => (
                    <li key={option} onClick={() => handleOptionClick(option)}>
                        {option}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FilterDropdown;
