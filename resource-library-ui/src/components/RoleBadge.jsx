import React from 'react';

const RoleBadge = ({ role }) => {
    let emoji = '🟦';
    let className = 'role-badge student';

    if (role === 'Faculty') {
        emoji = '🟩';
        className = 'role-badge faculty';
    } else if (role === 'Admin') {
        emoji = '🟥';
        className = 'role-badge admin';
    }

    return (
        <span className={className}>
            {emoji} {role}
        </span>
    );
};

export default RoleBadge;
