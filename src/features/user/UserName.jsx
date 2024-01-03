import { useSelector } from 'react-redux';

const UserName = ({ children }) => {
  const username = useSelector((state) => state.user.username);
  return (
    <div className="hidden text-sm font-semibold uppercase xl:block">
      {username ? username : children}
    </div>
  );
};

export default UserName;
