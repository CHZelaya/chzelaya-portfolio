

//* This is a placeholder for the center panel of the portfolio page. It will eventually contain the main content of the page, such as an introduction, projects, and contact information.

//! Critical TODO's
//TODO: Import ABOUT_QUERYResult from "@/sanity/types" and declare it in an interface for the props of this component. Then, use the data from the query being passed down from the pageClient to populate the content of this panel.

// A map to reference fo the ABOUT_Qu ERYResult type:
// ABOUT_QUERYResult {
//     name: string;
//     shortBio: string;
//     profileImage: {
//         url: string;
//     };
//     socialLinks: {
//         github: string;
//         linkedin: string;
//         twitter: string;
//     };
// }


import { ABOUT_QUERYResult } from "@/sanity/types";

interface CenterPanelProps {
    about: ABOUT_QUERYResult;
}

export default function CenterPanel({ about }: CenterPanelProps) {
    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans">
            <main>
                <h1 className="text-4xl font-bold mb-4 bg-white">The start of this portfolio page</h1>
                <p className="text-lg text-gray-700 dark:text-gray-300">Testing data: {about?.name}</p>
                <p className="text-md text-gray-600 dark:text-gray-400">Short Bio: {about?.shortBio}</p>
                <p className=""> Social Links:</p>
                <ul className="list-disc list-inside">
                    <li>GitHub: {about?.socials?.github?.url}</li>
                    <li>LinkedIn: {about?.socials?.linkedin?.url}</li>
                    <li>Twitter: {about?.socials?.instagram?.url}</li>
                </ul>
            </main>
        </div>
    );
}