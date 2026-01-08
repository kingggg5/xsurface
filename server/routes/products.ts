import { Router, Request, Response } from 'express';
import { Product } from '../../infrastructure/database/models/Product';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const { search, inStock, isExclusive, page = 1, limit = 20 } = req.query;
        const query: any = {};

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { code: { $regex: search, $options: 'i' } }
            ];
        }

        if (inStock !== undefined) query.inStock = inStock === 'true';
        if (isExclusive !== undefined) query.isExclusive = isExclusive === 'true';

        const skip = (Number(page) - 1) * Number(limit);
        const [products, total] = await Promise.all([
            Product.find(query).skip(skip).limit(Number(limit)).sort({ createdAt: -1 }),
            Product.countDocuments(query)
        ]);

        res.json({
            data: products,
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / Number(limit))
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create product' });
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update product' });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete product' });
    }
});

router.post('/seed', async (req: Request, res: Response) => {
    try {
        const mockProducts = [
            { code: 'FUV-SLV-001', name: 'FUVAL (Silver) กระเบื้องปูพื้น ลายหินอ่อน', price: 550, originalPrice: 990, discount: '-50%', image: 'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?auto=format&fit=crop&w=400&q=80', dimensions: 'W60 x H100 x D4.5 cm.', unit: '/ตร.ม.', inStock: true, isExclusive: true },
            { code: 'MAR-GRY-002', name: 'MARAL (Gray) กระเบื้องปูผนัง ลายปูน', price: 450, originalPrice: 780, discount: '-42%', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80', dimensions: 'W30 x H60 x D1.0 cm.', unit: '/ตร.ม.', inStock: true, isExclusive: false },
            { code: 'LOR-OAK-003', name: 'LORAL (Oak) กระเบื้องลายไม้โอ๊ค', price: 780, originalPrice: 1300, discount: '-40%', image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=400&q=80', dimensions: 'W20 x H120 x D1.5 cm.', unit: '/ตร.ม.', inStock: true, isExclusive: true },
            { code: 'COR-WHT-004', name: 'CORAL (White) หินอ่อนธรรมชาติ', price: 1250, originalPrice: 2000, discount: '-38%', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=400&q=80', dimensions: 'W60 x H60 x D2.0 cm.', unit: '/แผ่น', inStock: false, isExclusive: false },
            { code: 'TOR-BLK-005', name: 'TORAL (Black) กระเบื้องปูพื้นกันลื่น', price: 720, originalPrice: 1100, discount: '-35%', image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=400&q=80', dimensions: 'W45 x H45 x D1.2 cm.', unit: '/ตร.ม.', inStock: true, isExclusive: false },
            { code: 'POR-IVY-006', name: 'PORAL (Ivory) กระเบื้องพอร์ซเลนงาช้าง', price: 950, originalPrice: 1500, discount: '-37%', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=400&q=80', dimensions: 'W80 x H80 x D1.0 cm.', unit: '/ตร.ม.', inStock: true, isExclusive: true },
            { code: 'SOR-BRN-007', name: 'SORAL (Brown) แผ่นหินสังเคราะห์', price: 1100, originalPrice: 1800, discount: '-39%', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80', dimensions: 'W30 x H60 x D2.5 cm.', unit: '/แผ่น', inStock: true, isExclusive: false },
            { code: 'BOR-NVY-008', name: 'BORAL (Navy) กระเบื้องโมเสก', price: 320, originalPrice: 500, discount: '-36%', image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=400&q=80', dimensions: 'W30 x H30 x D0.8 cm.', unit: '/ชิ้น', inStock: true, isExclusive: false },
            { code: 'DOR-GRN-009', name: 'DORAL (Green) กระเบื้องสระว่ายน้ำ', price: 650, originalPrice: 1000, discount: '-35%', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80', dimensions: 'W20 x H20 x D0.6 cm.', unit: '/ตร.ม.', inStock: true, isExclusive: true },
            { code: 'EOR-RSE-010', name: 'EORAL (Rose) กระเบื้องตกแต่ง', price: 480, originalPrice: 750, discount: '-36%', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=400&q=80', dimensions: 'W15 x H15 x D0.5 cm.', unit: '/ชิ้น', inStock: false, isExclusive: false },
        ];

        await Product.deleteMany({});
        const products = await Product.insertMany(mockProducts);
        res.json({ message: 'Database seeded', count: products.length });
    } catch (error) {
        res.status(500).json({ error: 'Failed to seed database' });
    }
});

export default router;
