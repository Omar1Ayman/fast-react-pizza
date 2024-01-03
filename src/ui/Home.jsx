import CreateUser from '../features/user/CreateUser';
import { useSelector } from 'react-redux';
import Button from './Button';

function Home() {
  const username = useSelector((s) => s.user.username);

  return (
    <div className="my-10 text-center">
      <h1 className=" mb-8 text-2xl font-semibold md:text-3xl md:font-bold">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      {username === '' ? (
        <CreateUser />
      ) : (
        <Button className="button" to="/menu">
          continue ordering, {username}
        </Button>
      )}
    </div>
  );
}

export default Home;
