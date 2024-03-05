import Product from '../../model/productModel.js'
import ProductVariant from '../../model/productVarientModel.js'
import cloudinary from 'cloudinary'
import CATEGORY from '../../model/categoryModel.js'

//cloudinary configaration
cloudinary.config({
  cloud_name: 'dztburkwy',
  api_key: '182133815614938',
  api_secret: 'qz7-w8D4LZo3IV02cHqDEQRsqBs',
})

// Post
// api/v1/admin/addBaseProduct
// --- admin

export const addBaseProduct = async (req, res) => {
  try {
    const { title, category, description, brand } = req.body
    if (!title) {
      return res.status(400).json({ message: 'Enter the name !' })
    }
    if (!category) {
      return res.status(400).json({ message: 'Enter the Category !' })
    }
    if (!description) {
      return res.status(400).json({ message: 'Enter the description !' })
    }
    if (!brand) {
      return res.status(400).json({ message: 'Enter the brand !' })
    }

    const product = new Product({
      name: title,
      category,
      description,
      brand,
    })
    if (!product) {
      return res
        .status(400)
        .json({ message: 'Product the Valid infomations !' })
    }
    await product.save()
    const products = await Product.find()
    res.status(201).json({ message: 'Product added successfully..!', products })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Some Error occured .. Try again !' })
    throw err
  }
}

export const addProductVariant = async (req, res) => {
  try {
    const {
      id,
      color,
      stock,
      regularPrice,
      productVarient,
      salePrice,
      specification,
      images,
    } = req.body

    // Save images into Cloudinary
    const cloudinaryUploadImage = async (fileToUpload) => {
      try {
        const data = await cloudinary.uploader.upload(fileToUpload, {
          resource_type: 'auto',
        })
        return data.url // Return the URL of the uploaded image
      } catch (error) {
        console.log(error)
        throw new Error('Internal Server Error (cloudinary)')
      }
    }

    // Upload all images concurrently
    const uploadPromises = images.map((imageData) =>
      cloudinaryUploadImage(imageData)
    )
    const uploadedImageURLs = await Promise.all(uploadPromises)

    const productVariantDetails = new ProductVariant({
      productId: id,
      color,
      stock,
      regularPrice,
      varientName: productVarient,
      salePrice,
      specification,
      images: uploadedImageURLs,
    })

    await productVariantDetails.save()
    const productVariants = await ProductVariant.find()

    res
      .status(200)
      .json({ message: 'Product variant saved successfully!', productVariants })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Some Error occured .. Try again !' })
    throw err
  }
}

// Get
// api/v1/admin/deleteProductVarient
// --- admin
export const deleteProductVarient = async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).json({ message: 'Successfull ! ', products })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Some Error occured .. Try again !' })
    throw err
  }
}

// Get
// api/v1/admin/getProductVarients
// --- admin
export const getProductVarients = async (req, res) => {
  try {
    const id=req.query.id;
    const productVarients = await ProductVariant.find({productId:id})
    res.status(200).json({ message: 'Successfull ! ', productVarients })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Some Error occured .. Try again !' })
    throw err
  }
}




// Get
// api/v1/admin/getBaseproducts
// --- admin
export const getBaseProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).json({ message: 'Successfull ! ', products })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Some Error occured .. Try again !' })
    throw err
  }
}

// POSt
// api/v1/admin/add-category
// --- admin

export const addCategory = async (req, res) => {
  try {
    const { title, description } = req.body

    if (!title) {
      res.status(400).json({ message: 'Enter the title !' })
    }
    if (!description) {
      res.status(400).json({ message: 'Enter the description !' })
    }

    const category = new CATEGORY({
      title,
      description,
    })
    const savedCategory = await category.save()
    if (!savedCategory) {
      return res.status(400).json({ message: 'The category is not saved !' })
    }
    const categories = await CATEGORY.find()
    res.status(200).json({ message: 'Category saved', categories })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Some Error occured .. Try again !' })
    throw err
  }
}

// Get
// api/v1/admim/categories
// --- admin

export const getAllCategories = async (req, res) => {
  try {
    const categories = await CATEGORY.find()
    res.status(200).json({ message: 'Successfull', categories })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Some Error occured .. Try again !' })
    throw err
  }
}

// Get
// api/v1/admim/categories
// --- admin
export const DeleteCategory = async (req, res) => {
  try {
    const { id } = req.query
    const category = await CATEGORY.findOneAndUpdate(
      { _id: id },
      { $set: { isDeleted: true } },
      { new: true }
    )
    const categories = await CATEGORY.find()
    console.log(categories)
    res
      .status(200)
      .json({ message: 'Successfully Deleted Category', categories })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Some Error occured .. Try again !' })
    throw err
  }
}

// PUT
// api/v1/admim/Editcategories
// --- admin
export const EditCategory = async (req, res) => {
  try {
    const { id } = req.params
    const { title, description } = req.body

    if (!title) {
      res.status(400).json({ message: 'Enter the title !' })
    }
    if (!description) {
      res.status(400).json({ message: 'Enter the description !' })
    }
    const updatedCategory = await CATEGORY.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    )
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category is not found' })
    }
    const categories = await CATEGORY.find()
    console.log(categories)
    res
      .status(200)
      .json({ message: 'Category Edited Successfully', categories })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Some Error occured .. Try again !' })
    throw err
  }
}

// get
// api/v1/admin/deleteBaseProducts
// --- admin

export const deleteBaseProducts = async (req, res) => {
  try {
    let id = req.query.id
    await Product.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
    const savedProduct = await Product.find({ isDeleted: false })
    console.log('sved', savedProduct)
    res
      .status(200)
      .json({ message: 'Baseproduct Deleted Successfully', savedProduct })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Some Error occured .. Try again !' })
    throw err
  }
}

// put
// api/v1/admin/editBaseProduct
// --- admin
export const editBaseProduct = async (req, res) => {
  try {
    const id = req.query.id
    const { name, description, category, brand } = req.body
    const product = await Product.findById(id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    product.name = name
    product.description = description
    product.category = category
    product.brand = brand

    await product.save()

    const products = await Product.find()

    return res
      .status(200)
      .json({ message: 'Product updated successfully', products })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Some Error occured .. Try again !' })
    throw err
  }
}

// get
// api/v1/admin/delete
// --- admin

export const deleteVariant = async (req, res) => {
  try {
    const id = req.query.id
    const variant = await ProductVariant.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    )
    if (!variant) {
      res.status(500).json({ message: 'There is no Varient !' })
    }
    const updatedVarients = await ProductVariant.find()
    res
      .status(200)
      .json({ message: 'Successful Deleted Varient !', updatedVarients })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Some Error occured .. Try again !' })
    throw err
  }
}


// Get
// api/v1/admin/editProductVarient
// --- admin
export const editProductVariant = async (req, res) => {
  try {
    const { productVariant, color, stock, regularPrice, salesPrice } = req.body;
    const id = req.query.id; 

    const foundProductVariant = await ProductVariant.findOne({ _id: id }); 

    if (!foundProductVariant) {
      return res.status(404).json({ message: 'Product variant not found' });
    }

    foundProductVariant.varientName = productVariant;
    foundProductVariant.color = color;
    foundProductVariant.stock = stock;
    foundProductVariant.regularPrice = regularPrice;
    foundProductVariant.salePrice = salesPrice;

  
    await foundProductVariant.save();
    
    const productVarients=await ProductVariant.find()
    if(!productVarients){
      return res.status(404).json({message:"There is no products!"})
    }
    res.status(200).json({ message: 'Product variant updated successfully',productVarients});

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Some error occurred. Please try again!' });
    throw err;
  }
};