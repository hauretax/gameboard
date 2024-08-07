

import keyList from '../assets/mapConfig/KeyList.json';
import '../styles/keyList.css';
export default function KeyList({ setedKey }) {


    function keyIsSet(key) {
        return (setedKey.indexOf(key) !== -1)
    }

    return (
        <div className="key-list-container">
            <h1>Liste des touches</h1>
            <div className="keyGrid">
                {Object.entries(keyList).map(([type, keys]) => (
                    <div key={type} className="keyGroup">
                        <h2>{type}</h2>
                        <div className={"keys " + type} >
                            {keys.map((key, index) => (
                                !keyIsSet(key) ?
                                    <div key={index} className="keyItem">
                                        {key}
                                    </div> : null
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

