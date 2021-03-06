'use strict';

(function () {
  var PICTURES_AMOUNT = 10;
  var DEBOUNCE_INTERVAL = 500;
  var filtersForm = document.querySelector('.img-filters__form');
  var btns = document.querySelectorAll('.img-filters__button');
  var imgFilters = document.querySelector('.img-filters');


  var utils = window.utils;

  var defaultFilter = function (photos) {
    return photos;
  };

  var randomFilter = function (photos) {
    return utils.fisherYates(photos, PICTURES_AMOUNT);
  };

  var discussedFilter = function (photos) {
    var discussedPictures = photos.slice(0);
    discussedPictures.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    return discussedPictures;
  };

  var FILTERS_TYPE = {
    'filter-default': defaultFilter,
    'filter-random': randomFilter,
    'filter-discussed': discussedFilter
  };

  var initializeFilters = function () {
    imgFilters.classList.remove('img-filters--inactive');
  };

  var onFiltersFormMouseDown = function (evt) {
    btns.forEach(function (item) {
      item.classList.remove('img-filters__button--active');
    });
    evt.target.classList.add('img-filters__button--active');
  };


  var onFiltersFormClick = function (evt) {
    var photoGrid = window.photoGrid;
    var photosData = window.photosData;
    var currentFilter = evt.target.id;
    var filtredData = FILTERS_TYPE[currentFilter](photosData);

    photoGrid.dropPhotos();
    photoGrid.renderPhotos(filtredData);
  };

  filtersForm.addEventListener('mousedown', onFiltersFormMouseDown);
  filtersForm.addEventListener('keyup', onFiltersFormMouseDown);

  filtersForm.addEventListener('click', utils.debounce(onFiltersFormClick, DEBOUNCE_INTERVAL));
  initializeFilters();
})();
