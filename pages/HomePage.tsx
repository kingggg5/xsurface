import React, { memo } from 'react';
import { Product, Category } from '../types';
import Hero from '../components/Hero';
import ProductSlider from '../components/ProductSlider';
import SimpleProductSlider from '../components/SimpleProductSlider';
import SectionHeader from '../components/SectionHeader';
import {
    CategoriesSection,
    CollectionsSection,
    PartnersSection,
    BrandHighlightSection
} from '../components/sections';

interface HomePageProps {
    categories: Category[];
    products: Product[];
    onProductClick: (product: Product) => void;
}

export const HomePage = memo(function HomePage({
    categories,
    products,
    onProductClick
}: HomePageProps) {
    return (
        <main>
            <Hero />
            <CategoriesSection categories={categories} />

            <section className="mb-12">
                <div className="max-w-[1440px] mx-auto px-4 md:px-8">
                    <SectionHeader title="ดูล่าสุด" linkText="" />
                </div>
                <SimpleProductSlider itemCount={6} />
            </section>

            <section
                className="pt-12 pb-12"
                style={{
                    backgroundImage: `linear-gradient(to bottom, #E4E7E6 calc(104px + min(40vw, 225px)), #ffffff calc(104px + min(40vw, 225px)))`
                }}
            >
                <div className="max-w-[1440px] mx-auto px-4 md:px-8">
                    <SectionHeader title="สินค้ายอดนิยม / แนะนำ" linkColor="text-red-600" />
                </div>
                <ProductSlider products={products} onProductClick={onProductClick} itemsPerView={5} />
            </section>

            <section
                className="pt-12 pb-12"
                style={{
                    backgroundImage: `linear-gradient(to bottom, #1A1A1A calc(152px + min(40vw, 208px)), #ffffff calc(152px + min(40vw, 208px)))`
                }}
            >
                <div className="max-w-[1440px] mx-auto px-4 md:px-8">
                    <SectionHeader title="Xclusive Deal" textColor="text-white" linkColor="text-white" />
                </div>
                <ProductSlider products={products} darkBackground onProductClick={onProductClick} itemsPerView={5} />
            </section>

            <CollectionsSection products={products} onProductClick={onProductClick} />
            <BrandHighlightSection />
            <PartnersSection />
        </main>
    );
});
