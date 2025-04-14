const canvas = document.getElementById('auroraCanvas');
        const ctx = canvas.getContext('2d');

        // Cập nhật kích thước canvas
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Biến điều khiển
        let glows = [];
        let auroraColors = ['#7b00ff', '#00ffcc', '#ff00cc']; // Màu cực quang
        let colorIndex = 0;

        // Lớp Glow (vùng sáng)
        class Glow {
            constructor(x, y, radius) {
                this.x = x;
                this.y = y;
                this.radius = radius;
                this.maxRadius = radius * 2;
                this.opacity = 1;
            }

            update() {
                this.radius += 1;
                this.opacity -= 0.01;
                if (this.opacity <= 0 || this.radius > this.maxRadius) return false;
                return true;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.3})`;
                ctx.shadowBlur = 20;
                ctx.shadowColor = auroraColors[colorIndex];
                ctx.fill();
            }
        }

        // Tạo vùng sáng khi nhấn chuột
        canvas.addEventListener('click', (e) => {
            glows.push(new Glow(e.clientX, e.clientY, 30));
        });

        // Tạo vùng sáng qua nút
        function addGlow() {
			for(i = 0; i< 20; i++)
			{
				const x = Math.random() * canvas.width;
				const y = Math.random() * canvas.height;
				glows.push(new Glow(x, y, 30));
			}
        }

        // Đổi màu cực quang
        function changeAurora() {
            colorIndex = (colorIndex + 1) % auroraColors.length;
        }

        // Vẽ cực quang và vùng sáng
        function animateAurora() {
            ctx.fillStyle = 'rgba(13, 0, 26, 0.15)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Vẽ dải cực quang
            for (let y = 0; y < canvas.height; y += 10) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                for (let x = 0; x < canvas.width; x += 5) {
                    const offset = Math.sin(x * 0.01 + Date.now() * 0.001) * 50 + Math.cos(y * 0.01 + Date.now() * 0.0005) * 30;
                    ctx.lineTo(x, y + offset);
                }
                ctx.strokeStyle = `rgba(${parseInt(auroraColors[colorIndex].slice(1, 3), 16)}, ${parseInt(auroraColors[colorIndex].slice(3, 5), 16)}, ${parseInt(auroraColors[colorIndex].slice(5, 7), 16)}, 0.4)`;
                ctx.lineWidth = 8;
                ctx.stroke();
            }

            // Cập nhật và vẽ vùng sáng
            glows = glows.filter(g => g.update());
            glows.forEach(g => g.draw());

            requestAnimationFrame(animateAurora);
        }

        // Xử lý thay đổi kích thước cửa sổ
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        // Bắt đầu animation
        animateAurora();