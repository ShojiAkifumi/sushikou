/* 日本橋 寿司幸 LP：メインビジュアルのカルーセル */
(function () {
  'use strict';

  var INTERVAL = 5000; // 切り替え間隔（ミリ秒）
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('[data-carousel]').forEach(function (root) {
    var slides = root.querySelectorAll('.hero__slide');
    var dots = root.querySelectorAll('.hero__dot');
    var area = root.querySelector('.hero__slides');
    var current = 0;
    var timer = null;

    function show(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach(function (s, i) {
        var active = i === current;
        s.classList.toggle('is-active', active);
        s.setAttribute('aria-hidden', active ? 'false' : 'true');
      });
      dots.forEach(function (d, i) {
        if (i === current) d.setAttribute('aria-current', 'true');
        else d.removeAttribute('aria-current');
      });
    }

    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function start() {
      stop();
      if (reduceMotion || slides.length < 2) return;
      timer = setInterval(function () { show(current + 1); }, INTERVAL);
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { show(i); start(); });
    });

    // スワイプ（スマホ）
    var startX = null;
    area.addEventListener('pointerdown', function (e) { startX = e.clientX; });
    area.addEventListener('pointerup', function (e) {
      if (startX === null) return;
      var dx = e.clientX - startX;
      startX = null;
      if (Math.abs(dx) > 40) { show(current + (dx < 0 ? 1 : -1)); start(); }
    });
    area.addEventListener('pointercancel', function () { startX = null; });

    // タブが非表示の間は止める
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop(); else start();
    });

    // 1枚目もズームが動くよう、いったん非表示にしてから表示し直す
    slides[0].style.transition = 'none';
    slides[0].classList.remove('is-active');
    void slides[0].offsetWidth; // 初期状態（拡大・透明）を確定させる
    slides[0].style.transition = '';
    requestAnimationFrame(function () {
      show(0);
      start();
    });
  });
})();
