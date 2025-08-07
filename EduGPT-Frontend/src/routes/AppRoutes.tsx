import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../layout/Layout";
import Notes from "../components/notes/Notes";
import Questions from "../pages/Questions";


const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Navigate to="/notes" replace />} />
                <Route path="notes" element={<Notes />} />
                <Route path="questions" element={<Questions />} />
                <Route path="*" element={<Navigate to="/notes" replace />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
