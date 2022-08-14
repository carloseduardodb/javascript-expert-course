const BaseRepository = require('./../repository/base/baseRepository');

class CarService {
  constructor({ cars }) {
    this.carRepository = new BaseRepository({ file: cars });
  }

  getRandomPositionFromArray(list) {
    const listLength = list.length;
    return Math.floor(
      Math.random() * (listLength)
    )
  }

  chooseRandomCar(carCategory) {
    const carIndex = this.getRandomPositionFromArray(carCategory.carIds);
    return carCategory.carIds[carIndex];
  }

  async getAvailableCar(carCategory) {
    const carId = this.chooseRandomCar(carCategory);
    const car = await this.carRepository.find(carId);
    return car;
  }
}

module.exports = CarService;