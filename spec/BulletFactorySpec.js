describe("BulletFactory", function() {

    describe("CollisionDetector.Event.COLLISION", function () {
        it("wall", function () {
            var wall = new Wall(eventManager);
            spyOn(bullet, 'destroy');
            bullet.notify({
                'name': CollisionDetector.Event.COLLISION,
                'initiator': bullet,
                'sprite': wall
            });
            expect(bullet.destroy).toHaveBeenCalled();
        });

        describe("tank", function () {
            it("other tank", function () {
                var otherTank = new Tank(eventManager);
                spyOn(bullet, 'destroy');
                bullet.notify({
                    'name': CollisionDetector.Event.COLLISION,
                    'initiator': bullet,
                    'sprite': otherTank
                });
                expect(bullet.destroy).toHaveBeenCalled();
            });

            it("bullet's tank", function () {
                spyOn(bullet, 'destroy');
                bullet.notify({
                    'name': CollisionDetector.Event.COLLISION,
                    'initiator': bullet,
                    'sprite': tank
                });
                expect(bullet.destroy).not.toHaveBeenCalled();
            });
        });
    });

    describe("#createBullet", function() {
        it("RIGHT", function() {
            checkDirection(new Point(0, 0), new Point(32, 14), Sprite.Direction.RIGHT);
        });

        it("LEFT", function() {
            checkDirection(new Point(32, 0), new Point(31, 14), Sprite.Direction.LEFT);
        });

        it("UP", function() {
            checkDirection(new Point(0, 32), new Point(14, 31), Sprite.Direction.UP);
        });

        it("DOWN", function() {
            checkDirection(new Point(0, 0), new Point(14, 32), Sprite.Direction.DOWN);
        });

        function checkDirection(tankPosition, bulletPosition, direction) {
            var BULLET_SIZE = 4;
            var BULLET_SPEED = 8;

            var eventManager = new EventManager();
            spyOn(eventManager, 'fireEvent');

            var factory = new BulletFactory(eventManager);
            var tank = new Tank(eventManager);
            tank.setPosition(tankPosition);
            tank.setDimensions(32, 32);
            tank.setDirection(direction);
            tank.setBulletSize(BULLET_SIZE);
            tank.setBulletSpeed(BULLET_SPEED);

            var bullet = new Bullet(eventManager, tank);
            bullet.setPosition(bulletPosition);
            bullet.setDimensions(BULLET_SIZE, BULLET_SIZE);
            bullet.setDirection(direction);
            bullet.setSpeed(BULLET_SPEED);

            expect(factory.createBullet(tank)).toEqual(bullet);

        }
    });

    it("should create a bullet when tank shoots", function() {
        var eventManager = new EventManager();
        var factory = new BulletFactory(eventManager);
        spyOn(factory, 'createBullet');
        var tank = new Tank(eventManager);
        factory.notify({ 'name': Tank.Event.SHOOT, 'tank': tank });
        expect(factory.createBullet).toHaveBeenCalledWith(tank);
    });

});