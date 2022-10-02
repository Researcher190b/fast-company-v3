import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQuality";
import Quality from "./quality";

const QualitiesList = ({ id }) => {
    const { isLoading, getQualities } = useQualities();
    const qual = getQualities(id);
    if (!isLoading) {
        return qual.map((q) => {
            console.log("q", q);
            return <Quality key={q._id} quality={q} />;
        });
    } else return "Loading...";
};

QualitiesList.propTypes = {
    id: PropTypes.array
};

export default QualitiesList;
