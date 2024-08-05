import React, { useState, useMemo, useCallback, ChangeEvent } from 'react';
import { icons } from 'lucide-react';
import { Input } from '@/components/ui/input';

type IconPickerProps = {
    onSelectIcon(iconName: string): void
}

const IconPicker = ({ onSelectIcon }: IconPickerProps) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredIcons = useMemo(() => {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        return Object.keys(icons).filter(
            key => key.toLowerCase().includes(lowercasedSearchTerm)
        );
    }, [searchTerm]);

    const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }, []);

    const handleIconClick = useCallback((iconName: string) => {
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
                    const LucideIcon = icons[iconName as keyof typeof icons]

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