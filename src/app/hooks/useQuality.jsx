/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import QualitiesService from "../services/qual.service";
import { toast } from "react-toastify";

const QualitiesContext = React.createContext();

export const useQualities = () => {
    return useContext(QualitiesContext);
};

export const QualitiesProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [qualities, setQualities] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    useEffect(() => {
        getQualitiesList();
    }, []);

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }
    function getQualities(id) {
        if (Array.isArray(id)) {
            const array = [];
            id.map((q) => {
                const qu = qualities.find((p) => p._id === q);
                array.push(qu);
            });
            return array;
        } else {
            return qualities.find((p) => p._id === id);
        }
    }

    async function getQualitiesList() {
        try {
            const { content } = await QualitiesService.get();
            setQualities(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }

    return (
        <QualitiesContext.Provider
            value={{ isLoading, qualities, getQualities }}
        >
            {children}
        </QualitiesContext.Provider>
    );
};

QualitiesProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
// export default QualitiesProvider;
