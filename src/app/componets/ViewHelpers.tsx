"use client";

import { HelperType } from "@/app/api/helper/type";
import { useEffect, useState } from "react";

const ViewHelpers = () => {
    const [helpers, setHelpers] = useState<HelperType[]>([]);
    const [selectedHelper, setSelectedHelper] = useState<number | null>(null);
    const [reload, setReload] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchHelpers = async () => {
            setIsLoading(true);
            const res = await fetch("/api/helper/");
            const helpers = await res.json();
            setHelpers(helpers);
            setIsLoading(false);
        };
        fetchHelpers();
    }, [reload]);

    const handleReload = () => {
        setReload(!reload);
    };

    const handleSelectHelper = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const id = parseInt(event.target.value);
        setSelectedHelper(id);
    };

    return (
        <div className="w-1/2 flex flex-col">
            <div className="flex justify-between mb-5">
                {isLoading ? (
                    <p>Reloading...</p>
                ) : (
                    <button
                        onClick={handleReload}
                        type="button"
                        className="bg-blue-500 text-white px-2 py-1"
                    >
                        Reload
                    </button>
                )}
            </div>
            <div className="flex flex-col items-center justify-start">
            <label className="text-center font-bold text-3xl" htmlFor="helperID">ヘルパー名を選択してください
                <select onChange={handleSelectHelper} value={selectedHelper || ''}>
                    <option value="">Select a helper</option>
                    {helpers.map((helper) => (
                        <option key={helper.id} value={helper.id}>
                            {helper.helpername}
                            {JSON.stringify(helper)}
                        </option>
                    ))}
                </select>
                </label>
            </div>
        </div>
    );
};

export default ViewHelpers;