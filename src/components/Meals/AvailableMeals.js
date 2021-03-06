import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';
import Loader from '../UI/Loader';

const AvailableMeals = () =>{
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchingError, setFetchingError] = useState(false);
    useEffect(() => {
      const fetchMeals = async () =>{
        setIsLoading(true);
        const response = await fetch('https://myfoodapp14-default-rtdb.firebaseio.com/meals.json');

        if(!response.ok)
        {
          throw new Error('Somthing went Wrong');
        }
        const responseData = await response.json();

        const loadedMeals = [];
        for (const key in responseData){
          loadedMeals.push({
            id: key,
            name: responseData[key].name,
            price: responseData[key].price,
            description: responseData[key].description,
          });
        }

        setMeals(loadedMeals);
        setIsLoading(false);
      };

      fetchMeals().catch((error) => {
        setIsLoading(false);
        setFetchingError(error.message);
      });
   },[]);

   if(isLoading)
   {
     return (
       <section>
         <Loader/>
       </section>
     );
   }

   if(fetchingError)
   {
     return (
       <section>
         <p>{fetchingError}</p>
       </section>
     );
   }
    const mealsList = meals.map((meal) =>(
        <MealItem 
            id={meal.id} 
            key= {meal.id} 
            name={meal.name} 
            description = {meal.description} 
            price = {meal.price}
            />
        ));
    return(
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    );
};
export default AvailableMeals;