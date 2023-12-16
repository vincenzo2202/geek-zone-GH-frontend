import './ChangeRoleCard.scss';

export const ChangeRoleCard = ({ role, onClick }) => {

    return (
        <div className="change-role-box">
            <div className="change-role-container-user" onClick={onClick}>
                <label className="container">
                    <input checked={true} type="checkbox" />
                    <div className="checkmark"></div>
                </label>
            </div>
            <div className="change-role-container-admin" onClick={onClick}>
                <label className="container">
                    <input checked={true} type="checkbox" />
                    <div className="checkmark"></div>
                </label>
            </div>
            <div className="change-role-container-super-admin" onClick={onClick}>
                <label className="container">
                    <input checked={true} type="checkbox" />
                    <div className="checkmark"></div>
                </label>
            </div>
        </div>
    );
};