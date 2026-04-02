export const Home: React.FC = () => {
  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-gray-100 p-8">
        <h2 className="text-3xl font-bold mb-4">Welcome to What to Eat?</h2>
        <p className="text-gray-700 mb-6">
          Discover new recipes, manage your ingredients, and find inspiration
          for your next meal!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">Explore Recipes</h3>
            <p className="text-gray-600">
              Browse through a wide variety of recipes to find your next
              favorite dish.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">Manage Ingredients</h3>
            <p className="text-gray-600">
              Keep track of your ingredients and get suggestions based on what
              you have.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">Get Inspired</h3>
            <p className="text-gray-600">
              Find meal ideas and inspiration for your next cooking adventure.
            </p>
          </div>
        </div>
      </div>
      <div className="w-1/3 bg-gray-200 p-8">
        <h2 className="text-2xl font-bold mb-4">Your Dashboard</h2>
        <p className="text-gray-700 mb-6">
          Access your saved recipes, manage your ingredient inventory, and view
          personalized recommendations.
        </p>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-2">Saved Recipes</h3>
          <p className="text-gray-600">
            View and manage your collection of saved recipes.
          </p>
        </div>
      </div>
    </div>
  );
};
