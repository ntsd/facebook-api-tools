import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { accountService } from '_services';

function Unlike() {
    const [account, setAccount] = useState(null);
    const [likes, setLikes] = useState([]);

    useEffect(() => {
      accountService.account.subscribe((x) => setAccount(x));
    }, []);

    return (
        <div>
            <h2>Unlike Tool</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Facebook Id</th>
                        <th>Name</th>
                        <th>Extra Info</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </div>
    );
}

export { Unlike };