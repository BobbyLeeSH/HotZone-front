import React from 'react';
import {Link} from "react-router-dom";

const Main: React.FC = () => (
    <div>
        <h1>
            This is main page and Type Script is used!
        </h1>
        <h1>
            <Link to="/cases">GO TO CASE LIST</Link>
        </h1>
    </div>
);

export default Main;