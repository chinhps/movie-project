<?php

namespace Tests\Unit;

use App\Models\Category;
use App\Repositories\Category\CategoryRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Redis;
use Mockery;
use Mockery\MockInterface;
use Tests\TestCase;

class CategoryRepositoryTest extends TestCase
{
    use DatabaseTransactions;
    
    protected CategoryRepository $categoryRepository;

    public function setUp(): void
    {
        parent::setUp();

        /**
         * @var MockInterface|Category
         */
        $categoryMock = Mockery::mock(Category::class);
        $categoryMock->shouldReceive("get")->andReturn(Category::factory()->count(20)->make());
        $this->app->instance(Category::class, $categoryMock);

        Redis::shouldReceive('get')->with('category:all')->andReturn(null);
        Redis::shouldReceive('set')->with('category:all', Mockery::any(), 3600 * 12)->andReturn(true);

        $categoryMock->shouldReceive('withCount')->with(['movies'])->andReturnSelf();
        $categoryMock->shouldReceive('orderBy')->with('id', 'desc')->andReturnSelf();
        $categoryMock->shouldReceive('paginate')->with(15)->andReturn(new LengthAwarePaginator(
            Category::factory()->count(15)->make(),
            20,
            15
        ));

        $categoryMock->shouldReceive('whereIn')->with('name', ['Category 1', 'Category 3', 'Category 5'])->andReturnSelf();
        $categoryMock->shouldReceive('pluck')->with('id')->andReturn(collect([1, 3, 5]));

        $categoryMock->shouldReceive('where')->with('slug', 'test-slug')->andReturnSelf();

        $this->categoryRepository = new CategoryRepository($categoryMock);
    }

    public function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    public function test_category_unit_repository(): void
    {
        $categories = $this->categoryRepository->listAll();
        $this->assertInstanceOf(Collection::class, $categories);
        $this->assertCount(20, $categories);
        $this->assertNotEmpty($categories->first()->name);
        $this->assertNotEmpty($categories->first()->slug);
        $this->assertNotEmpty($categories->last()->name);
        $this->assertNotEmpty($categories->last()->slug);

        $categories = $this->categoryRepository->list([], 15);
        $this->assertInstanceOf(LengthAwarePaginator::class, $categories);
        $this->assertCount(15, $categories);
        $this->assertEquals(20, $categories->total());

        foreach ($categories as $category) {
            $this->assertNotNull($category->name);
            $this->assertNotEmpty($category->slug);
        }


        $filter = ['Category 1', 'Category 3', 'Category 5'];
        $result = $this->categoryRepository->listIn($filter);
        $expectedIds = [1, 3, 5];
        $this->assertEquals($expectedIds, $result);
    }
}
