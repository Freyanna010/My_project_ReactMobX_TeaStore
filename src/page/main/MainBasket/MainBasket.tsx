import classes from "./MainBasket.module.css";
import teaStore from "../../../stores/teaStore";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import ButtonAddRemove from "../../../Components/ButtonAddRemove";

const ManBasket: FC = () => {
  // TODO:divide into components? 
  return (
    <div className={classes.man_basket}>
      <div className={classes.tea}>
        <h2 className={classes.title}> tea: </h2>
        {teaStore.mainTeaBasket.map((t) => {
          const onRemoveHandler = () => {
            teaStore.removeTeaMainBasket();
          };
          return (
            <div className={classes.tea_basket} key={t.id}>
              <div className={classes.icon}>
                <img src={t.img} alt={t.name} onClick={onRemoveHandler} />
              </div>
              <div>
                <h3>
                  {" "}
                  {t.name}
                  <ButtonAddRemove
                    onClick={onRemoveHandler}
                    content={"./../../../../public/remove_button.png"}
                  />
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      <div className={classes.indigenous}>
        <ul>
          <h2 className={classes.title}> supplements: </h2>
          {teaStore.mainSupplementsBasket.map((t) => {
            const onRemoveHandler = () => {
              teaStore.removeSupplementMainBasket(t.id);
            };
            return (
              <li key={t.id}>
                <div>
                  <h3>
                    {" "}
                    {t.name}
                    <ButtonAddRemove
                      onClick={onRemoveHandler}
                      content={"./../../../../public/remove_button.png"}
                    />
                  </h3>
                </div>
                <div className={classes.icon}>
                  <img src={t.img} alt={t.name} onClick={onRemoveHandler} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default observer(ManBasket);
