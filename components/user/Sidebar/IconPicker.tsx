import React, { useState, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic'
import { icons } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { Input } from '@/components/ui/input';

const IconPicker = ({ onSelectIcon }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredIcons = useMemo(() => {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        return Object.keys(icons).filter(
            key => key.toLowerCase().includes(lowercasedSearchTerm)
        );
    }, [searchTerm]);

    const handleSearchChange = useCallback((e) => {
        setSearchTerm(e.target.value);
    }, []);

    const handleIconClick = useCallback((iconName) => {
        onSelectIcon(iconName);
    }, [onSelectIcon]);

    return (
        <div>
            <Input
                type="text"
                placeholder="Search icons..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <div className="mt-3 grid grid-cols-5 grid-cols-auto-fill-50 gap-2 h-96 overflow-auto content-start border rounded-lg p-3">
                {filteredIcons.map(iconName => {
                    // const LucideIcon = dynamic(dynamicIconImports[iconName]);
                    const LucideIcon = icons[iconName]

                    return (
                        <button
                            key={iconName}
                            onClick={() => handleIconClick(iconName)}
                            title={iconName}
                            className="p-2 hover:bg-gray-100 rounded text-slate-700"
                        >
                            <LucideIcon size={20} />
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default IconPicker;