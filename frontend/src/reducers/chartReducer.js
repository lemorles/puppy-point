import {
  GET_ALL_USERS_BY_CHART_ROLE_PENDING,
  GET_ALL_USERS_BY_CHART_ROLE_REJECTED,
  GET_ALL_USERS_BY_CHART_ROLE_SUCCESS,
  GET_ALL_WALKS_BY_CHART_PENDING,
  GET_ALL_WALKS_BY_CHART_REJECT,
  GET_ALL_WALKS_BY_CHART_SUCCESS,
  GET_DOGS_FOR_CHART_PENDING,
  GET_DOGS_FOR_CHART_REJECT,
  GET_DOGS_FOR_CHART_SUCCESS,
} from "../types/chartTypes";
import { countRepit, ramdonColors } from "../utils/dataForAdmid";

const initialState = {
  isLoading: false,
  error: null,
  dataPieDogs: {},
  dataDoughnutRole: {},
  dataStackedBarWalk: {},
};

const chartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOGS_FOR_CHART_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_DOGS_FOR_CHART_SUCCESS:
      function getBreedDogs(data) {
        let allDogsBreed = data.map((d) => {
          return d.breed.name;
        });
        const breedDogs = countRepit(allDogsBreed);

        const breedName = Object.keys(breedDogs);
        const breedNum = Object.values(breedDogs);
        const colors = ramdonColors(breedName.length);
        return { breedName: breedName, breedNum: breedNum, colors: colors };
      }
      return {
        ...state,
        isLoading: false,
        dataPieDogs: getBreedDogs(action.payload),
      };
    case GET_DOGS_FOR_CHART_REJECT:
      return {
        ...state,
        isLoading: false,
        dataPieDogs: {},
      };
    case GET_ALL_USERS_BY_CHART_ROLE_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_ALL_USERS_BY_CHART_ROLE_SUCCESS:
      function getRoleUser(data) {
        let allUserRole = data.map((d) => {
          return d.role;
        });
        const roleUser = countRepit(allUserRole);

        const roleName = Object.keys(roleUser);
        const roleNum = Object.values(roleUser);
        const colors = ramdonColors(roleName.length);
        return { roleName: roleName, roleNum: roleNum, colors: colors };
      }
      return {
        ...state,
        isLoading: false,
        dataDoughnutRole: getRoleUser(action.payload),
      };
    case GET_ALL_USERS_BY_CHART_ROLE_REJECTED:
      return {
        ...state,
        isLoading: false,
        dataDoughnutRole: {},
      };
    case GET_ALL_WALKS_BY_CHART_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_ALL_WALKS_BY_CHART_SUCCESS:
      const walks = action.payload;
      function getWeekdayWalk(data) {
        const allWalkWeekday = data.map((d) => {
          return d.weekdays;
        });

        const daysWeek = [];
        const allWeekdays = allWalkWeekday.map((w) => {
          return w.map((d) => {
            return daysWeek.push(d.day);
          });
        });

        const days = countRepit(daysWeek);
        const orderDays = {
          monday: days.monday,
          tuesday: days.tuesday,
          wednesday: days.wednesday,
          thursday: days.thursday,
          friday: days.friday,
          saturday: days.saturday,
          sunday: days.sunday,
        };

        const dayNum = Object.values(orderDays);
        const colors = ramdonColors(dayNum.length);
        return { dayNum: dayNum, colors: colors };
      }
      return {
        ...state,
        isLoading: false,
        dataStackedBarWalk: getWeekdayWalk(action.payload.walks),
      };
    case GET_ALL_WALKS_BY_CHART_REJECT:
      return {
        ...state,
        isLoading: false,
        dataStackedBarWalk: {},
      };
    default:
      return state;
  }
};

export default chartReducer;
