import Avatar from 'react-avatar'

const UserAvatar = ({ emailID }) => {
    const getNameFromEmail = (email) => {
        const parts = email.split('@');
        if (parts.length === 2) {
            const [username, domain] = parts;
            const usernameParts = username.split('.');
            const name = usernameParts.map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
            return name;
        }
        return email;
    }

    const name = getNameFromEmail(emailID);
    return (<div style={{ paddingLeft:'10px' }}>
        <Avatar
            name={name}
            color="#EA4022"
            size="35" 
            round={true}
        />
    </div>)
}

export default UserAvatar;