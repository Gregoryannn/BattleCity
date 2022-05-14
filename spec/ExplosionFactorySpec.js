describe("ExplosionFactory", function() {
    it("should subscribe", function() {
        var eventManager = new EventManager();
        spyOn(eventManager, 'addSubscriber');
        var explosionFactory = new ExplosionFactory(eventManager);
        expect(eventManager.addSubscriber).toHaveBeenCalledWith(factory, [Tank.Event.ENEMY_DESTROYED]);
    });

    it("default state", function() {
        var eventManager = new EventManager();
        var explosionFactory = new ExplosionFactory(eventManager);
        expect(explosionFactory.getExplosionSize()).toEqual(32);
    });

    it("should place explosions correctly", function() {

        var EXPLOSION_SIZE = 32;
        var eventManager = new EventManager();
        var explosionFactory = new ExplosionFactory(eventManager);

        explosionFactory.setExplosionSize(EXPLOSION_SIZE);

        var tank = new Tank(eventManager);
        var bullet = new Bullet(eventManager, tank);
        bullet.setRect(new Rect(0, 0, 8, 8));
        var explosion = explosionFactory.createExplosion(bullet);

        expect(explosion.getRect()).toEqual(new Rect(-12, -12, EXPLOSION_SIZE, EXPLOSION_SIZE));
    });

    it("should create explosions when notified about destroyed bullet", function() {
        var eventManager = new EventManager();
        var explosionFactory = new ExplosionFactory(eventManager);
        spyOn(explosionFactory, 'createExplosion');
        var tank = new Tank(eventManager);
        var bullet = new Bullet(eventManager, tank);
        explosionFactory.notify({ 'name': Bullet.Event.DESTROYED, 'bullet': bullet, 'tank': tank });
        expect(explosionFactory.createExplosion).toHaveBeenCalledWith(bullet);
    });
});