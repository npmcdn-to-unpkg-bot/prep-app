import {
  DATASET_LIST_RECEIVED,
  DATASET_LIST_RESET,
  DATASET_DETAIL_RECEIVED,
  DATASET_WIDGET_RECEIVED,
  DATASET_LAYER_RECEIVED,
  DATASET_METADATA_RECEIVED,
  TOGGLE_LAYER_STATUS,
  SET_LAYER_STATUS,
  DATASET_LAYER_FETCH_ERROR,
  DATASET_SET_FILTER,
  MAP_LAYERS_ORDER_CHANGED,
  MAP_LAYER_OPACITY_CHANGED
} from '../constants';

const initialState = {
  list: [],
  filteredList: [],
  details: {},
  widgets: {},
  layers: {},
  metadatas: {},
  filters: {
    geography: ['global', 'national']
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case DATASET_LIST_RECEIVED: {
      return Object.assign({}, state, { list: action.payload.data });
    }
    case DATASET_LIST_RESET: {
      return Object.assign({}, state, { list: [], filteredList: [] });
    }
    case DATASET_DETAIL_RECEIVED: {
      const details = Object.assign({}, state.details, {});
      details[action.payload.data.id] = action.payload.data;
      return Object.assign({}, state, { details });
    }
    case DATASET_WIDGET_RECEIVED: {
      const widgets = Object.assign({}, state.widgets, {});
      if (!widgets[action.payload.data.attributes.datasetId]) {
        widgets[action.payload.data.attributes.datasetId] = [];
      }
      const newWidgets = widgets[action.payload.data.attributes.datasetId].slice(0);
      newWidgets.push(action.payload.data);
      widgets[action.payload.data.attributes.datasetId] = newWidgets;
      return Object.assign({}, state, { widgets });
    }
    case DATASET_LAYER_RECEIVED: {
      const layers = Object.assign({}, state.layers, {});
      layers[action.payload.data.id] = action.payload.data;
      return Object.assign({}, state, { layers });
    }
    case DATASET_METADATA_RECEIVED: {
      const metadatas = Object.assign({}, state.metadatas, {});
      metadatas[action.payload.attributes.dataset] = action.payload;
      return Object.assign({}, state, { metadatas });
    }
    case DATASET_LAYER_FETCH_ERROR: {
      const list = state.list.slice(0);
      for (let i = 0, length = list.length; i < length; i++) {
        if (list[i].id === action.payload.id) {
          list[i].active = false;
          break;
        }
      }
      return Object.assign({}, state, { list });
    }
    case DATASET_SET_FILTER: {
      const list = state.list.slice(0);
      let filteredList = [];
      const filtersChoosen = Object.assign({}, state.filters);

      if (action.payload.filter) {
        if (filtersChoosen[action.payload.filter]) {
          const index = filtersChoosen[action.payload.filter].indexOf(action.payload.tag);
          if (index > -1) {
            filtersChoosen[action.payload.filter].splice(index, 1);
          } else {
            filtersChoosen[action.payload.filter].push(action.payload.tag);
          }
        } else {
          filtersChoosen[action.payload.filter] = [action.payload.tag];
        }
      }

      if (list && list.length) {
        const andFilters = Object.keys(filtersChoosen);
        filteredList = list.filter((item, index) => {
          for (let i = andFilters.length - 1; i >= 0; i--) {
            const tags = filtersChoosen[andFilters[i]];
            let j = tags.length - 1;
            for (j; j >= 0; j--) {
              if (item.tags.indexOf(tags[j]) > -1) {
                break;
              }
            }
            if (tags.length > 0 && j < 0) {
              if (list[index].active === true) {
                list[index].active = false;
              }
              return false;
            }
          }
          return true;
        });
      }

      return Object.assign({}, state, { list, filteredList, filters: filtersChoosen });
    }
    case TOGGLE_LAYER_STATUS: {
      const filteredList = state.filteredList.slice(0);
      for (let i = 0, length = filteredList.length; i < length; i++) {
        if (filteredList[i].id === action.payload) {
          filteredList[i].active = !filteredList[i].active;
          if (filteredList[i].active) {
            filteredList[i].index = state.filteredList.filter(layer => layer.active).length;
          }
          break;
        }
      }
      return Object.assign({}, state, { filteredList });
    }
    case SET_LAYER_STATUS: {
      const filteredList = state.filteredList.slice(0);
      for (let i = 0, length = filteredList.length; i < length; i++) {
        if (filteredList[i].id === action.payload.id) {
          filteredList[i].active = action.payload.status;
          break;
        }
      }
      return Object.assign({}, state, { filteredList });
    }
    case MAP_LAYERS_ORDER_CHANGED: {
      const datasets = state.filteredList.slice(0);
      const idsOrdered = action.payload.map((item) => item.attributes['dataset-id']);

      for (let i = 0, dsLength = datasets.length; i < dsLength; i++) {
        const index = idsOrdered.indexOf(datasets[i].id);
        if (index > -1) {
          datasets[i].index = index + 1;
        } else {
          datasets[i].index = 0;
        }
      }
      return Object.assign({}, state, { filteredList: datasets });
    }
    case MAP_LAYER_OPACITY_CHANGED: {
      const datasets = state.filteredList.slice(0);

      for (let i = 0, dsLength = datasets.length; i < dsLength; i++) {
        if (datasets[i].id === action.payload) {
          datasets[i].opacity = datasets[i].opacity ? 0 : 1;
          break;
        }
      }
      return Object.assign({}, state, { filteredList: datasets });
    }
    default:
      return state;
  }
}
