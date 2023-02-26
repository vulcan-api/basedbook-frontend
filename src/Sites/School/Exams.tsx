import React, {useEffect, useState} from "react";
import LoadingSpinner from "../../Components/LoadingSpinner";

const Exams = () => {
    const [exams, setExams] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        getAllExams();
    }, []);

    async function getAllExams() {
        setIsLoading(true);
        try {
            await fetch("http://localhost:3000/school/exams?last=10", {
                method: "GET",
                credentials: "include",
            })
                .then((res) => res.json())
                .then((data) => setExams(data));
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);

    }

    return (
        <>
            {!isLoading && (
                <div>
                    {exams.map((exam) => {
                        return (
                            <div key={exam.id}>
                                {exam.value}
                            </div>
                        );
                    })}
                </div>
            )}
            {isLoading && <LoadingSpinner/>}
        </>
    )
}

export default Exams;