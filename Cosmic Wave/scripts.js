const canvas = document.getElementById('cosmicCanvas');
        const ctx = canvas.getContext('2d');

        // Cập nhật kích thước canvas
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Biến điều khiển sóng và hạt
        let waveFrequency = 0.02;
        let particles = [];
        let mouse = { x: null, y: null };

        // Lớp Particle
        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 5 + 2;
                this.speedX = (Math.random() - 0.5) * 3;
                this.speedY = (Math.random() - 0.5) * 3;
                this.opacity = 1;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.opacity -= 0.02;
                if (this.opacity <= 0) return false;
                return true;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.shadowBlur = 15;
                ctx.shadowColor = '#00ddeb';
                ctx.fill();
            }
        }

        // Tạo hạt khi di chuyển chuột
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            for (let i = 0; i < 3; i++) {
                particles.push(new Particle(mouse.x, mouse.y));
            }
        });

        // Tăng tần số sóng
        function increaseWave() {
            waveFrequency += 0.01;
            if (waveFrequency > 0.1) waveFrequency = 0.1; // Giới hạn
        }

        // Đặt lại tần số sóng
        function resetWave() {
            waveFrequency = 0.02;
        }

        // Vẽ sóng và hạt
        function animateWave() {
            ctx.fillStyle = 'rgba(10, 10, 35, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Vẽ sóng
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(0, 221, 235, 0.8)';
            ctx.lineWidth = 2;
            for (let x = 0; x < canvas.width; x += 5) {
                const y = canvas.height / 2 + Math.sin(x * waveFrequency + Date.now() * 0.002) * 100;
                ctx.lineTo(x, y);
            }
            ctx.stroke();

            // Cập nhật và vẽ hạt
            particles = particles.filter(p => p.update());
            particles.forEach(p => p.draw());

            requestAnimationFrame(animateWave);
        }

        // Xử lý thay đổi kích thước cửa sổ
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        // Bắt đầu animation
        animateWave();