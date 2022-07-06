import React, {useState} from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const FullPizza = () => {
  const navigate = useNavigate()
  const [pizza, setPizza] = useState();

  const { id } = useParams()
  console.log(pizza)

  React.useEffect(() => {
    const fetchPizza = async () => {
      try {
        const { data } = await axios.get(`https://62ae321a645d00a28a05d2c1.mockapi.io/pizzas/${id}`)
        setPizza(data)
      } catch (error) {
        alert('Помилка при отриманні піци')
        navigate('/')
        console.log(error)
      }
    }

    fetchPizza()
  }, [id, navigate])

    if (!pizza) {
      return 'Загрузка'
    }

    return (
        <div className='container'>
          <img src={pizza.imageUrl} alt=""/>
            <h2>{pizza.title}</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium delectus expedita fugiat iure nesciunt non omnis quod sint soluta velit.</p>
            <strong>250 грн.</strong>
        </div>
    )
}

export default FullPizza;