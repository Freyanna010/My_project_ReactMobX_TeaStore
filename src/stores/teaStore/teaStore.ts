import { Tea } from './../../models/models';
import { makeObservable, observable, action } from "mobx";
import { CollectionSupplements, Supplement, Tea } from "../../models";
import {
  initialCollectionSupplementsState,
  initialSupplementsState,
  initialTeaState,
} from "./initialStates";
class TeaStore {
  tea: Tea[] = initialTeaState;
  supplements: Record<string, Supplement[]> = initialSupplementsState;
  collectionSupplements: CollectionSupplements[] =
    initialCollectionSupplementsState;
  mainTeaBasket: Tea[] = [];
  mainSupplementsBasket: Supplement[] = [];
  teaPrice: number = 0;
  price: number = 0;
  supplementPrice: number = 0;

  constructor() {
    makeObservable(this, {
      tea: observable,
      supplements: observable,
      collectionSupplements: observable,
      mainTeaBasket: observable,
      mainSupplementsBasket: observable,
      price: observable,
      teaPrice: observable,
      supplementPrice:observable,
      addTeaMainBasket: action,
      addSupplementMainBasket: action,
      removeTeaMainBasket: action,
      removeSupplementMainBasket: action,
      changeIsEnoughTea: action,
      changeIsEnoughSupplements: action,
      deleteTeaMainBasket: action,
      deleteSupplementsMainBasket: action,
      getSupplementPrice:action,
      getTeaPrice:action,       
    });

  }


  addTeaMainBasket = (id: string) => {
    const teaForMainBasket = this.tea.find((tea) => tea.id === id);
    if (this.mainTeaBasket.length < 1) {
      //TODO: или через спред менять массив???
      if (teaForMainBasket) this.mainTeaBasket.push(teaForMainBasket);
    } else {
      if (teaForMainBasket) this.mainTeaBasket[0] = teaForMainBasket;
    }
  };
  addSupplementMainBasket = (id: string, collectionId: string) => {
    const arrSupplements = this.supplements[collectionId];
    const supplementForMainBasket = arrSupplements.find(
      (supplement) => supplement.id === id
    );
    const supplementOfMainBasket = this.mainSupplementsBasket.every(
      (i) => i.id !== id
    );
    if (this.mainSupplementsBasket.length < 6 && supplementOfMainBasket) {
      if (supplementForMainBasket) {
        this.mainSupplementsBasket.push(supplementForMainBasket);
        //TODO:переделать
        supplementForMainBasket.isAdd = true;
      }
    }
  };
  removeTeaMainBasket = () => {
    this.mainTeaBasket.pop();
    this.tea.forEach((tea) => (tea.isEnough = false));
  };
  removeSupplementMainBasket = (id: string) => {
    this.mainSupplementsBasket = this.mainSupplementsBasket.filter(
      (supplement) => supplement.id !== id
    );
  };
  changeIsEnoughTea = () => {
    this.tea.forEach((t) => {
      t.id === this.mainTeaBasket[0].id
        ? (t.isEnough = true)
        : (t.isEnough = false);
    });
  };
  changeIsEnoughSupplements = () => {
    this.collectionSupplements.forEach((coll) => {
      this.mainSupplementsBasket.length >= 6
        ? (coll.isEnough = true)
        : (coll.isEnough = false);
    });
  };
  deleteTeaMainBasket = () => {
    this.mainTeaBasket = [];
  };
  deleteSupplementsMainBasket = () => {
    this.mainSupplementsBasket = [];
  };
  getTeaPrice = () => {
    this.teaPrice = this.mainTeaBasket.map((tea) => tea.price)[0]; //TODO:так можно?🤗
    console.log(this.teaPrice);
    this.price = this.teaPrice + this.supplementPrice;
  };
  getSupplementPrice = () => {
    this.supplementPrice = this.mainSupplementsBasket
      .map((supplement) => supplement.price)
      .reduce((acc, item) => acc + item);
       this.price = this.teaPrice + this.supplementPrice;
  }; 
}
export default new TeaStore();
