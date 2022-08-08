import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllData } from '../../redux/actions';
import noImage from '../../assets/no image.jpg'

export default function CharsTable () {

  const dispatch = useDispatch();
  const [finish, setFinish] = useState(826)
  const allCharacters = useSelector(state => state.pageToShow)

  useEffect(() => {
    let payload = [];
    for(let i = 1; i <= finish; i++){
      payload.push(i)
    }
    dispatch(getAllData(payload))
  },[])

  return (
    <>
    
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
                {chara.image ? <img src={chara.image} /> : <img src={noImage} alt='no image available' />}
              </td>
              <td>{chara.location}</td>
            </tr>);
          }) : <tr>
            <td>
                loading...
            </td>
          </tr>
       }
      </tbody>
    </table>
    </>
  );
};
