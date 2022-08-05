import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllData } from '../../redux/actions'

export default function CharsTable () {

  const dispatch = useDispatch();
  const [finish, setFinish] = useState(50)

  useEffect(() => {
    let payload = [];
    for(let i = 1; i <= finish; i++){
      payload.push(i)
    }
    dispatch(getAllData(payload))
  },[])
  const allCharacters = useSelector(state => state.pageToShow)

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Character</th>
          <th>Image</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {allCharacters.length !== 0 ? allCharacters.map((chara) => {
           return ( <tr key={chara.id} id={chara.id}>
              <td>{chara.name}</td>
              <td>
                <img src={chara.image} />
              </td>
              <td>{chara.location.name}</td>
            </tr>);
          }) : <tr>
            <td>
                loading...
            </td>
          </tr>
       }
      </tbody>
    </table>
  );
};
